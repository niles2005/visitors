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
		
		initEvents();
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
	private ArrayList loadDBEvents(String cardId,String strDate) {
		ArrayList list = new ArrayList();
		list.add(new String[]{"00000000A","d1","" + new Date().getTime()});
		list.add(new String[]{"00000000B","d1","" + new Date().getTime()});
		list.add(new String[]{"00000000C","d3","" + new Date().getTime()});
		
		return list;
	}

	private ArrayList loadDBAllEvents(String strDate) {
		ArrayList list = new ArrayList();
		list.add(new String[]{"00000000A","d1","" + new Date().getTime()});
		list.add(new String[]{"00000000B","d1","" + new Date().getTime()});
		list.add(new String[]{"00000000C","d3","" + new Date().getTime()});
		list.add(new String[]{"00000000D","d1","" + new Date().getTime()});
		list.add(new String[]{"00000000E","d1","" + new Date().getTime()});
		
		return list;
	}

	private void initEvents() {
		String today = "";//get today's all events,order by time
		ArrayList dataList = loadDBAllEvents(today);
		Hashtable hash = new Hashtable();
		for(int i=0;i<dataList.size();i++) {
			String[] datas = (String[])dataList.get(i);
			String cardId = datas[0];
			
			Card card = m_cards.getCard(cardId);
			if(card == null) {//for first record,create card and set create time
				long dateTime = Long.parseLong(datas[2]);
				m_cards.buildCard(cardId,dateTime);
			}
			String[] dataRow = (String[])hash.get(cardId);
			if(dataRow == null) {
				hash.put(cardId, datas);
			}
		}
		Iterator iters = hash.values().iterator();
		while(iters.hasNext()) {
			String[] dataRow = (String[])iters.next();
			if(dataRow.length == 3) {
				String cardId = dataRow[0];
				String deviceId = dataRow[1];
				long dateTime = Long.parseLong(dataRow[2]);
				Card card = m_cards.getCard(cardId);
				if(card != null) {//set card's last locate and time
					Device device = m_devices.getDevice(deviceId);
					if(device == null) {
						device = m_devices.buildDevice(deviceId);
					}
					if(card != null && device != null) {
						card.setLastLocate(device.getLocate());
						card.setLastTime(dateTime);
					}
				}
			}
		}
	}
	
	public String loadEvents(String cardId,String strDate) {
		ArrayList list = new ArrayList();
		
		ArrayList dataList = loadDBEvents(cardId,strDate);
		for(int i=0;i<dataList.size();i++) {
			String[] datas = (String[])dataList.get(i);
			if(datas.length == 3) {
				cardId = datas[0];
				String deviceId = datas[1];
				long dateTime = Long.parseLong(datas[2]);
				Card card = m_cards.getCard(cardId);
				if(card == null) {
					card = m_cards.buildCard(cardId,dateTime);
				}
				Device device = m_devices.getDevice(deviceId);
				if(device == null) {
					device = m_devices.buildDevice(deviceId);
				}
				if(card != null && device != null) {
					Event event = new Event();
					event.setCardId(card.getId());
					event.setCardName(card.getName());
					event.setCardRole(card.getRole());
					event.setDeviceId(device.getId());
					event.setDeviceLocate(device.getLocate());
					event.setTime(dateTime);
					list.add(event);
				}
			}
		}
		
		String str = JSON.toJSONString(list);
		return str;
	}	
	
	public void doTaskWork() {
		System.err.println("do task work...");
	}
}
