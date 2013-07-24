package com.inesazt.visitors;


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
}
