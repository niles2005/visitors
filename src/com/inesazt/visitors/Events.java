package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.alibaba.fastjson.JSON;

public class Events {
	private Cards m_cards;
	private Devices m_devices;
	private String m_dbToday;
	private SqlSessionFactory m_sqlSessionFactory = null;
	
	public Events(Cards cards,Devices devices,String today) {
		m_cards = cards;
		m_devices = devices;
		m_dbToday = DateTimeUtil.date8ToDate10(today);


        try {
    		Reader reader = new BufferedReader(new InputStreamReader(new FileInputStream(ServerConfig.getInstance().getMybatisConfigureFile()),"UTF-8"));
    		m_sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
        } catch(Exception ex) {
            ex.printStackTrace();
        }
		reloadEvents(false);
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
    private static DateFormat DateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");
	private int m_lastSeqId = -1;
	//return boolean doBoardcast
	private boolean reloadEvents(boolean doBoardcast) {
		SqlSession session = null;
        try {
            session = m_sqlSessionFactory.openSession();
            IEventQuery eventQuery = session.getMapper(IEventQuery.class);           
            Event param = new Event();
//            System.err.println("|" + m_dbToday + "|");
//            System.err.println("|" + m_lastSeqId + "|");
            param.setUpDate(m_dbToday);
            param.setSeqId(m_lastSeqId);
            List<Event> eventList = eventQuery.selectEvents(param);
            
//            System.err.println("init:" + eventList.size());
    		if(eventList.size() == 0) {
    			return false;
    		}
            
    		//only send changed card
    		Hashtable<String,Card> hash = new Hashtable<String,Card>();
    		
    		for(int i=0;i<eventList.size();i++) {
    			Event event = (Event)eventList.get(i);

				String deviceId = event.getMacAddress() + "_" + event.getAntId();
				event.setDeviceId(deviceId);
				Date dateTime = DateFormat.parse(event.getUpDate() + " " + event.getUpTime());
				long theTime = dateTime.getTime();
				event.setTime(theTime);
				
				Device device = m_devices.getDevice(deviceId);
				if(device == null) {
					device = m_devices.buildDevice(deviceId);
				}
				event.setDevice(device);
				
    			
    			m_lastSeqId = event.getSeqId();
    			String cardId = event.getCardId();
    			Card card = m_cards.getCard(cardId);
    			if(card == null) {//for first record,create card and set create time
    				card = m_cards.buildCard(cardId,theTime);
    			}
    			if(card != null) {
    				card.appendEvent(event);
    				hash.put(cardId, card);
    			}
    		}
    		
    		if(doBoardcast) {//boardcast to client
    			Hashtable dataHash = new Hashtable();
    			if(hash.size() > 0) {
    				ArrayList list = new ArrayList();
    				Iterator iters = hash.values().iterator();
    				while(iters.hasNext()) {
    					list.add(iters.next());
    				}
    				dataHash.put("cards", list);
    			}
    			dataHash.put("events", eventList);
    			
//    			Hashtable regInfoHash = new Hashtable(); 
//    			m_cards.checkRegInfo(regInfoHash);
//    			m_devices.checkRegInfo(regInfoHash);
//    			
//    			if(regInfoHash.size() > 0) {
//    				dataHash.put("register", regInfoHash);
//    			}
    			
    	
    			Global.getInstance().broadcastClientData(dataHash);
    			return true;
    		}
    		return false;
        } catch(Exception ex) {
            ex.printStackTrace();
        } finally {
        	if(session != null) {
                session.close();
        	}
        }
        return false;

        
//		ArrayList eventList = DBManager.getInstance().queryEvents(m_lastSeqId,m_devices,m_dbToday);
//		if(eventList.size() == 0) {
//			return false;
//		}
//		//only send changed card
//		Hashtable<String,Card> hash = new Hashtable<String,Card>();
//		
//		for(int i=0;i<eventList.size();i++) {
//			Event event = (Event)eventList.get(i);
//			m_lastSeqId = event.getSeqId();
//			String cardId = event.getCardId();
//			Card card = m_cards.getCard(cardId);
//			if(card == null) {//for first record,create card and set create time
//				long dateTime = event.getTime();
//				card = m_cards.buildCard(cardId,dateTime);
//			}
//			if(card != null) {
//				card.appendEvent(event);
//				hash.put(cardId, card);
//			}
//		}
//		
//		if(doBoardcast) {//boardcast to client
//			Hashtable dataHash = new Hashtable();
//			if(hash.size() > 0) {
//				ArrayList list = new ArrayList();
//				Iterator iters = hash.values().iterator();
//				while(iters.hasNext()) {
//					list.add(iters.next());
//				}
//				dataHash.put("cards", list);
//			}
//			dataHash.put("events", eventList);
//			
////			Hashtable regInfoHash = new Hashtable(); 
////			m_cards.checkRegInfo(regInfoHash);
////			m_devices.checkRegInfo(regInfoHash);
////			
////			if(regInfoHash.size() > 0) {
////				dataHash.put("register", regInfoHash);
////			}
//			
//	
//			Global.getInstance().broadcastClientData(dataHash);
//			return true;
//		}
//		return false;
	}
	
	public void doTaskWork() {
		try {
			boolean doBoardcast = reloadEvents(true);
			if(!doBoardcast) {
				Global.getInstance().broadcastBeepInfo();
			}
		} catch(Exception ex) {
			Global.getInstance().broadcastBeepInfo();
		}
	}
	
    public List queryHistoryEvents(String cardId,String theDate) {
		SqlSession session = null;
        try {

        	String dbDate = DateTimeUtil.date8ToDate10(theDate);
            session = m_sqlSessionFactory.openSession();
            IEventQuery eventQuery = session.getMapper(IEventQuery.class);           
            Event param = new Event();
            param.setCardId(cardId);
            param.setUpDate(dbDate);
            List<Event> eventList = eventQuery.selectCardEvents(param);
    		for(int i=0;i<eventList.size();i++) {
    			Event event = (Event)eventList.get(i);

				String deviceId = event.getMacAddress() + "_" + event.getAntId();
				event.setDeviceId(deviceId);
				Date dateTime = DateFormat.parse(event.getUpDate() + " " + event.getUpTime());
				long theTime = dateTime.getTime();
				event.setTime(theTime);
				
				Device device = m_devices.getDevice(deviceId);
				if(device == null) {
					device = m_devices.buildDevice(deviceId);
				}
				event.setDevice(device);
    		}
			return eventList;
        } catch(Exception ex) {
            ex.printStackTrace();
        } finally {
        	if(session != null) {
                session.close();
        	}
        }
        return null;
    }

    public void generateGoOutEvents(){
    	String antId = null;
    	String macAddress = null;
    	Map<String,Device> deviceMap = m_devices.getGroup();
    	Iterator deviceIt = deviceMap.keySet().iterator();
    	while(deviceIt.hasNext()){
    		Device device = deviceMap.get((String)(deviceIt.next()));
    		if(device.getActived() && "outside".equals(device.getLocate()) ){
    			String deviceID = device.getId();
    			macAddress = deviceID.substring(0, deviceID.lastIndexOf("_"));
    			antId = deviceID.substring(deviceID.lastIndexOf("_") + 1);
    			break;
    		}
    	}
    	String [] upDateTime = DateFormat.format(new Date()).split(" ");
    	System.err.println("macAddress  "+macAddress+"  antId  "+antId);
    	
    	SqlSession session = null;
    	try {
			session = m_sqlSessionFactory.openSession();
			IEventQuery insertSQL = session.getMapper(IEventQuery.class);      
			Map<String,Card> cardMap = m_cards.getGroup();
			Iterator it = cardMap.keySet().iterator();
			while(it.hasNext()){
				Card card = cardMap.get((String)(it.next()));
				System.err.println("card id "+ card.getId() + "  card locate "+ card.getLastLocate());
				if (!"outside".equals(card.getLastLocate())) {
					Event param = new Event();
					param.setCardId(card.getId());
					param.setMacAddress(macAddress);
					param.setAntId(antId);
					param.setUpDate(upDateTime[0]);
					param.setUpTime(upDateTime[1]);
					insertSQL.insertGoOutEvents(param);
				}
			}
			session.commit();  
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
        	if(session != null) {
                session.close();
        	}
        }
    	
    }
	
}
