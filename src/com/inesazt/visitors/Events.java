package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.alibaba.fastjson.JSON;

public class Events {
	private Cards m_cards;
	private Devices m_devices;
	private String m_dbToday;
	private SqlSessionFactory m_sqlSessionFactory = null;
	private String DBType;
	private List<Event> todayEventList = new LinkedList<Event>();
	private static final int MAXLISTSIZE = 1000;

	public Events(Cards cards, Devices devices, String today) {
		m_cards = cards;
		m_devices = devices;
		m_dbToday = DateTimeUtil.date8ToDate10(today);

		try {
			Reader reader = new BufferedReader(new InputStreamReader(
					new FileInputStream(ServerConfig.getInstance()
							.getMybatisConfigureFile()), "UTF-8"));
			m_sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);

			Environment environment = m_sqlSessionFactory.getConfiguration()
					.getEnvironment();
			DataSource dataSource = environment.getDataSource();
			// org.sqlite.MetaData@1028607
			// oracle.jdbc.driver.OracleDatabaseMetaData@1fb9d58
			String metaDataClass = dataSource.getConnection().getMetaData()
					.toString().toLowerCase();
			if (metaDataClass.indexOf("oracle") != -1) {
				DBType = "oracle";
			} else if (metaDataClass.indexOf("sqlite") != -1) {
				DBType = "sqlite";
			} else {
				throw new RuntimeException("DBType is not find!");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		reloadEvents();
	}

	public String doList() {
		String str = JSON.toJSONString(this);
		return str;
	}

	private static DateFormat DateFormat = new SimpleDateFormat(
			"yyyy/MM/dd HH:mm:ss.SSS");
	private int m_lastSeqId = -1;
	
	public int getLastSeqId() {
		return m_lastSeqId;
	}
	
	public List<Event> getTodayEventList() {
		return todayEventList;
	}

	private synchronized void addTodayEvent(Event event) {
		todayEventList.add(event);
		while(todayEventList.size() > MAXLISTSIZE) {
			todayEventList.remove(0);
		}
	}
	
	// return boolean doBoardcast
	private void reloadEvents() {
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IEventQuery eventQuery = session.getMapper(IEventQuery.class);
			Event param = new Event();

			param.setUpDate(m_dbToday);
			param.setSeqId(m_lastSeqId);
			List<Event> eventList = eventQuery.selectEvents(param);
			if (eventList.size() == 0) {
				return;
			}else{
				m_lastSeqId = eventList.get(eventList.size() -1).getSeqId();
			}
			
			for (int i = 0; i < eventList.size(); i++) {
				Event event = (Event) eventList.get(i);
				
				this.addTodayEvent(event);

				String deviceId = event.getMacAddress() + "_" + event.getAntId();
				event.setDeviceId(deviceId);

				Date dateTime = DateFormat.parse(event.getUpDate() + " " + event.getUpTime());
				long theTime = dateTime.getTime();
				event.setTime(theTime);

				Device device = m_devices.getDevice(deviceId);
				if (device == null) {
					device = m_devices.buildDevice(deviceId);
				}
				event.setDevice(device);
				
				String cardId = event.getCardId();
				Card card = m_cards.getCard(cardId);
				if (card == null) {// for first record,create card and set
									// create time
					card = m_cards.buildCard(cardId, theTime);
				}
				if (card != null && device.getActived()) {
					card.appendEvent(event);
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	public void doTaskWork() {
		try {
			reloadEvents();
		} catch (Exception ex) {
		}
	}

	public List queryHistoryEvents(String cardId, String theDate) {
		SqlSession session = null;
		try {

			String dbDate = DateTimeUtil.date8ToDate10(theDate);
			session = m_sqlSessionFactory.openSession();
			IEventQuery eventQuery = session.getMapper(IEventQuery.class);
			Event param = new Event();
			param.setCardId(cardId);
			param.setUpDate(dbDate);
			List<Event> eventList = eventQuery.selectCardEvents(param);
			for (int i = 0; i < eventList.size(); i++) {
				Event event = (Event) eventList.get(i);

				String deviceId = event.getMacAddress() + "_" + event.getAntId();
				event.setDeviceId(deviceId);
				Date dateTime = DateFormat.parse(event.getUpDate() + " " + event.getUpTime());
				long theTime = dateTime.getTime();
				event.setTime(theTime);

				Device device = m_devices.getDevice(deviceId);
				if (device == null) {
					device = m_devices.buildDevice(deviceId);
				}
				event.setDevice(device);
			}
			return eventList;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return null;
	}

	public void generateGoOutEvents() {
		String antId = null;
		String macAddress = null;
		Map<String, Device> deviceMap = m_devices.getGroup();
		Iterator deviceIt = deviceMap.keySet().iterator();
		while (deviceIt.hasNext()) {
			Device device = deviceMap.get((String) (deviceIt.next()));
			if (device.getActived() && "outside".equals(device.getLocate())) {
				String deviceID = device.getId();
				macAddress = deviceID.substring(0, deviceID.lastIndexOf("_"));
				antId = deviceID.substring(deviceID.lastIndexOf("_") + 1);
				break;
			}
		}
		

		if (macAddress != null && antId != null) {
			String[] upDateTime = DateFormat.format(new Date()).split(" ");
			SqlSession session = null;
			try {
				session = m_sqlSessionFactory.openSession();
				IEventQuery insertSQL = session.getMapper(IEventQuery.class);
				Map<String, Card> cardMap = m_cards.getGroup();
				System.err.println(" now all cards go out!");
				Iterator it = cardMap.keySet().iterator();
				while (it.hasNext()) {
					Card card = cardMap.get((String) (it.next()));
					if (!"outside".equals(card.getLastLocate())) {
						Event param = new Event();
						param.setCardId(card.getId());
						param.setMacAddress(macAddress);
						param.setAntId(antId);
						param.setUpDate(upDateTime[0]);
						param.setUpTime(upDateTime[1]);
						if ("oracle".equals(DBType)) {
							insertSQL.insertGoOutEventsOracle(param);
						} else if ("sqlite".equals(DBType)) {
							insertSQL.insertGoOutEventsSqlite(param);
						}
					}
				}
				session.commit();

			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (session != null) {
					session.close();
				}
			}
		}

	}

}
