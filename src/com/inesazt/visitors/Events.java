package com.inesazt.visitors;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;

import com.alibaba.fastjson.JSON;

public class Events {
	private Cards m_cards;
	private Devices m_devices;
	private String m_dbToday;
	
	public Events(Cards cards,Devices devices,String today) {
		m_cards = cards;
		m_devices = devices;
		m_dbToday = DateTimeUtil.date8ToDate10(today);
		reloadEvents(false);
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
	private int m_lastSeqId = -1;
	//return boolean doBoardcast
	private boolean reloadEvents(boolean doBoardcast) {
		ArrayList eventList = DBManager.getInstance().queryEvents(m_lastSeqId,m_devices,m_dbToday);
		if(eventList.size() == 0) {
			return false;
		}
		//only send changed card
		Hashtable<String,Card> hash = new Hashtable<String,Card>();
		
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
			
//			Hashtable regInfoHash = new Hashtable(); 
//			m_cards.checkRegInfo(regInfoHash);
//			m_devices.checkRegInfo(regInfoHash);
//			
//			if(regInfoHash.size() > 0) {
//				dataHash.put("register", regInfoHash);
//			}
			
	
			String str = JSON.toJSONString(dataHash);
			Global.getInstance().broadcastClientData(str);
			return true;
		}
		return false;
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
}
