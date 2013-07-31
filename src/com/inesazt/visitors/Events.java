package com.inesazt.visitors;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;

import com.alibaba.fastjson.JSON;

public class Events {
	private Cards m_cards;
	private Devices m_devices;
	public Events(Cards cards,Devices devices) {
		m_cards = cards;
		m_devices = devices;
		reloadEvents(false);
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
	private int m_lastSeqId = -1;
	private void reloadEvents(boolean doBoardcast) {
		String today = "";//get today's all events,order by time
		ArrayList eventList = DBManager.getInstance().queryEvents(m_lastSeqId,m_devices);
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
		
		if(doBoardcast && hash.size() > 0) {//boardcast to client
			ArrayList list = new ArrayList();
			Iterator iters = hash.values().iterator();
			while(iters.hasNext()) {
				list.add(iters.next());
			}
			String str = JSON.toJSONString(list);
			Global.getInstance().boardCastClientData(str);
		}
		
		
	}
	
	
	public void doTaskWork() {
		reloadEvents(true);
	}
}
