package com.inesazt.visitors;

import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.Iterator;

import com.alibaba.fastjson.JSON;

public class Events {
	private Cards m_cards;
	private Devices m_devices;
	public Events(Cards cards,Devices devices) {
		m_cards = cards;
		m_devices = devices;
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
	private int m_lastSeqId = -1;
	private void reloadEvents() {
		String today = "";//get today's all events,order by time
		ArrayList eventList = DBManager.getInstance().queryEvents(m_lastSeqId);
		for(int i=0;i<eventList.size();i++) {
			Event event = (Event)eventList.get(i);
			m_lastSeqId = event.getSeqId();
			String cardId = event.getCardId();
			Card card = m_cards.getCard(cardId);
			if(card == null) {//for first record,create card and set create time
				long dateTime = event.getTime();
				card = m_cards.buildCard(cardId,dateTime);
			}
			if(card != null) {
				String deviceId = event.getDeviceId();
				Device device = m_devices.getDevice(deviceId);
				if(device == null) {
					device = m_devices.buildDevice(deviceId);
				}
				event.setDevice(device);
				card.appendEvent(event);
			}
		}
	}
	
	
	private boolean isLoadData = false;
	public void doTaskWork() {
		System.err.println("do task work...");
		if(!isLoadData) {
			isLoadData = true;
			reloadEvents();
		}
	}
}
