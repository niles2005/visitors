package com.inesazt.visitors;


import java.io.IOException;
import java.nio.CharBuffer;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import com.alibaba.fastjson.JSON;



public class Global {
	private String m_strToday = null;
	
	private static Global m_instance= null;
	
	public static Global getInstance() {
		return m_instance;
	}
	
	public static void initInstance() {
		if(m_instance == null) {
			m_instance = new Global();
		}
	}
	
	private Global() {
		initGlobal();
	}

	private Configure m_configure = null;
	
	private Devices m_devices = null;
	
	private Cards m_cards = null;
	
	private Events m_events = null;
	
	private boolean m_init = false;
	private void initGlobal() {
		try {
			if(m_init) {
				return;
			}
			m_init = true;
			m_configure = Configure.buildConfigure();
			if(m_configure == null) {
				System.err.println("xxxxxxxxxxxxx: Configure init error! xxxxxxxxxxxxxxx");
				return;
			}
			m_strToday = DateTimeUtil.getTodayString();
        	DBManager.initInstance(m_configure);
			
			m_devices = Devices.buildDevices();
			m_cards = Cards.buildCards();
			m_events = new Events(m_cards,m_devices);
			System.err.println("Global init finished.");
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	

	public Cards getCards() {
		return m_cards;
	}

	public Card getCard(String cardId) {
		return m_cards.getCard(cardId);
	}

	public Devices getDevices() {
		return m_devices;
	}

	public Events getEvents() {
		return m_events;
	}
	
	public Configure getConfigure() {
		return m_configure;
	}
	
	private final Set<ChatMessageInbound> m_connections = new CopyOnWriteArraySet<ChatMessageInbound>();
	
	public void addChatMessageInbound(ChatMessageInbound cmi) {
		m_connections.add(cmi);
	}
	
	public void removeChatMessageInbound(ChatMessageInbound cmi) {
		m_connections.remove(cmi);
	}
	
	//for client init
	public String getInitDatas() {
		Hashtable hash = new Hashtable();
		m_cards.checkRegInfo(hash);
		m_devices.checkRegInfo(hash);
		hash.put("today", m_strToday);
		
		hash.put("cards", m_cards.getGroup());
		
		String str = JSON.toJSONString(hash);
//		System.err.println(str);
		return str;
	}
	
	public String getUnregister(){
		StringBuffer sb = new StringBuffer();
		sb.append("{");
		sb.append("\"cards\":");
		Map<String,Card> cardsMap = m_cards.getGroup();
		sb.append(cardsMap.size());
		int unregCount = 0;
		Iterator it = cardsMap.keySet().iterator();
		while(it.hasNext()){
			String cardID = (String)it.next();
			Card card = cardsMap.get(cardID);
			if(card.getRole() == null){
				unregCount++;
			}
		}
		sb.append(",");
		sb.append("\"cardunreg\":");
		sb.append(unregCount);
		sb.append(",");
		
		sb.append("\"devices\":");
		Map<String,Device> devicesMap = m_devices.getGroup();
		sb.append(devicesMap.size());
		unregCount = 0;
		it = devicesMap.keySet().iterator();
		while(it.hasNext()){
			String deviceID = (String)it.next();
			Device device = devicesMap.get(deviceID);
			if(device.getLocate() == null){
				unregCount++;
			}
		}
		sb.append(",");
		sb.append("\"deviceunreg\":");
		sb.append(unregCount);
		sb.append(",");
		sb.append("\"today\":\"");
		sb.append(DateTimeUtil.getTodayString());
		
		sb.append("\"}");
		return sb.toString();
	}
	

	public void doTaskWork() {
		if(m_events != null) {
			m_events.doTaskWork();
		}
	}
	
	public void boardCastClientData(String jsonData) {
		if(jsonData != null) {
			for (ChatMessageInbound connection : m_connections) {
				try {
					CharBuffer buffer = CharBuffer.wrap(jsonData);
					connection.getWsOutbound().writeTextMessage(buffer);
				} catch (IOException ex) {
					ex.printStackTrace();
				}
			}
		}
	}

}
