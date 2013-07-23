package com.inesazt.visitors;

import java.util.ArrayList;
import java.util.Date;

import com.alibaba.fastjson.JSON;

public class Events {
	public Events() {
		
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}

	public String loadEvents(String cardId,String strDate) {
		ArrayList list = new ArrayList();
		
		Event event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d1");
		event.setDeviceLocate("building1");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d2");
		event.setDeviceLocate("building2");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d3");
		event.setDeviceLocate("building2");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d4");
		event.setDeviceLocate("outside");
		event.setTime(new Date().getTime());
		list.add(event);
		
		String str = JSON.toJSONString(list);
		return str;
	}	
}
