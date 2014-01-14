package com.inesazt.visitors;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.alibaba.fastjson.JSON;
import com.inesazt.visitors.manager.bo.ManagerBoImpl;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;

public class Events {
	private Cards m_cards;
	private Devices m_devices;
	private String m_dbToday;
	private List<Event> todayEventList = new LinkedList<Event>();
	private static final int MAXLISTSIZE = 1000;

	public Events(Cards cards, Devices devices, String today) {
		m_cards = cards;
		m_devices = devices;
		m_dbToday = DateTimeUtil.date8ToDate10(today);
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
			session = Global.getInstance().getSqlSessionFactory().openSession();
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
					String cardNo = card.getName();
					ManagerBoImpl managerBo = new ManagerBoImpl();
					List<TblGuestInfo> guestInfoList = managerBo.getGuestInfoByCard(cardNo);
					if (guestInfoList != null && guestInfoList.size() == 1) {
						card.setGuest(guestInfoList.get(0));
					}
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
			session = Global.getInstance().getSqlSessionFactory().openSession();
			IEventQuery eventQuery = session.getMapper(IEventQuery.class);
			Event param = new Event();
			param.setCardId(cardId);
			param.setUpDate(dbDate);
			List<Event> eventList = null;
			if ("oracle".equals(Global.getInstance().getDBType())) {
				eventList = eventQuery.selectCardEvents(param);
			} else if ("sqlite".equals(Global.getInstance().getDBType()) || "sqlserver".equals(Global.getInstance().getDBType())) {
				eventList = eventQuery.selectCardEventsSqlServer(param);
			}
			
			if ( eventList != null ) {
				for (int i = 0; i < eventList.size(); i++) {
					Event event = (Event) eventList.get(i);
					String deviceId = event.getMacAddress() + "_"+ event.getAntId();
					event.setDeviceId(deviceId);
					Date dateTime = DateFormat.parse(event.getUpDate() + " "+ event.getUpTime());
					long theTime = dateTime.getTime();
					event.setTime(theTime);
					Device device = m_devices.getDevice(deviceId);
					if (device == null) {
						device = m_devices.buildDevice(deviceId);
					}
					event.setDevice(device);
				}
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
				session = Global.getInstance().getSqlSessionFactory().openSession();
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
						if ("oracle".equals(Global.getInstance().getDBType())) {
							insertSQL.insertGoOutEventsOracle(param);
						} else if ("sqlite".equals(Global.getInstance().getDBType()) || "sqlserver".equals(Global.getInstance().getDBType())) {
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
