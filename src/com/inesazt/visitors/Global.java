package com.inesazt.visitors;


public class Global {
	private static Global m_instance= null;
	
	public static Global getInstance() {
		if(m_instance == null) {
			m_instance = new Global();
		}
		return m_instance;
	}
	
	private Global() {
		initGlobal();
	}

	private Devices m_devices = null;
	
	private Cards m_cards = null;
	
	private Roles m_roles = null;
	
	private Events m_events = null;
	
	private boolean m_init = false;
	private void initGlobal() {
		try {
			if(m_init) {
				return;
			}
			m_init = true;
			
			m_roles = Roles.buildRoles();
			
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

	public Devices getDevices() {
		return m_devices;
	}

	public Roles getRoles() {
		return m_roles;
	}

	public Events getEvents() {
		return m_events;
	}
}
