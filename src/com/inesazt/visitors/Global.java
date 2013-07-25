package com.inesazt.visitors;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;


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
	
	
	private final Set<ChatMessageInbound> m_connections = new CopyOnWriteArraySet<ChatMessageInbound>();
	
	public void addChatMessageInbound(ChatMessageInbound cmi) {
		m_connections.add(cmi);
//		System.err.println("aaaaaaaaaaaaaaaaaa " + m_connections.size());
	}
	
	public void removeChatMessageInbound(ChatMessageInbound cmi) {
		m_connections.remove(cmi);
//		System.err.println("cccccccccccccccccc " + m_connections.size());
	}
	
	public void doTaskWork() {
		m_events.doTaskWork();
		
		String cardsInfo = Global.getInstance().getCards().doList();
		for (ChatMessageInbound connection : m_connections) {
			try {
				CharBuffer buffer = CharBuffer.wrap(cardsInfo);
				connection.getWsOutbound().writeTextMessage(buffer);
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}
}
