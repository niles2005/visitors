package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.Iterator;
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
	private List<Event> todayEventList = new ArrayList<Event>();
	private static final int MAXLISTSIZE = 100000;

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

	// return boolean doBoardcast
	private synchronized void reloadEvents() {
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
			
			if (todayEventList.size() + eventList.size() > MAXLISTSIZE) {
				todayEventList.clear();
			}
			
			todayEventList.addAll(eventList);

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

				
				String cardId = event.getCardId();
				Card card = m_cards.getCard(cardId);
				if (card == null) {// for first record,create card and set
									// create time
					card = m_cards.buildCard(cardId, theTime);
				}
				if (card != null) {
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

	public synchronized String loadNewEvents(int fromIndex) {
		Hashtable dataHash = new Hashtable();
		
		if (fromIndex == -999) {//init

			//send register
			Hashtable regInfoHash = new Hashtable(); 
			m_cards.checkRegInfo(regInfoHash);
			m_devices.checkRegInfo(regInfoHash);
			if(regInfoHash.size() > 0) {
				dataHash.put("register", regInfoHash);
			}
			
			//send date
			dataHash.put("today", Global.getInstance().getToday());
			
			dataHash.put("cards", m_cards.getGroup());
		} else { 
			int readRecordIndex = todayEventList.size() - (m_lastSeqId - fromIndex);
			if(readRecordIndex < 0) {
				readRecordIndex = 0;
			}
			List newEventList = todayEventList.subList(readRecordIndex,todayEventList.size());
			if (newEventList.size() >= 0) {
				dataHash.put("events", newEventList);
			}
		}
		dataHash.put("fromIndex", m_lastSeqId);
		
//		Global.getInstance().broadcastClientData(dataHash);
		return JSON.toJSONString(dataHash);		
	}

	public void doTaskWork() {
		try {
			reloadEvents();
//			if (!doBoardcast) {
//				Global.getInstance().broadcastBeepInfo();
//			}
		} catch (Exception ex) {
			Global.getInstance().broadcastBeepInfo();
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
		String[] upDateTime = DateFormat.format(new Date()).split(" ");
		System.err.println("macAddress  " + macAddress + "  antId  " + antId);

		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IEventQuery insertSQL = session.getMapper(IEventQuery.class);
			Map<String, Card> cardMap = m_cards.getGroup();
			Iterator it = cardMap.keySet().iterator();
			while (it.hasNext()) {
				Card card = cardMap.get((String) (it.next()));
				System.err.println(" now all cards go out!");
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
