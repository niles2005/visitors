package com.inesazt.visitors;

import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;


public class Global {
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

	private Devices m_devices = null;
	
	private Cards m_cards = null;
	
	private Events m_events = null;
	
	private WebSocketManager m_socketManager = null;
	
	private boolean m_init = false;
	private void initGlobal() {
		try {
			if(m_init) {
				return;
			}
			m_init = true;
			
			m_devices = Devices.buildDevices();
			m_cards = Cards.buildCards();
			m_events = new Events(m_cards,m_devices);
			m_socketManager = new WebSocketManager();
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
	
	public StreamInbound createWebSocketInbound(String subProtocol,
			HttpServletRequest request) {
		return m_socketManager.createWebSocketInbound(subProtocol, request);
	}
	
	public WebSocketManager getSocketManager() {
		return m_socketManager;
	}
	
	public String getCardsunreg(){
		StringBuffer sb = new StringBuffer("{");
		sb.append("cards:");
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
		sb.append("unreg:");
		sb.append(unregCount);
		return sb.toString();
	}
	
}
