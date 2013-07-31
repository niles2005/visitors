package com.inesazt.visitors;

import java.util.Enumeration;
import java.util.Hashtable;

import com.alibaba.fastjson.JSON;

public class CardsTest1 {
	String[] securitys = new String[] {
			"E2001AC191083580000FE0D5",
			"E2001AC191083880000FE0E1",
			"E2001AC191083480000FE0D1",
			"E2001AC191083680000FE0D9",
			"E2001AC191083780000FE0DD",
			"E2001AC191082180000FE085",
			"E2001AC191083280000FE0C9",
			"E2001AC191083080000FE0C1",
			"E2001AC191083C80000FE0F1",
			"E2001AC191082F80000FE0BD",
	};
	String[] workers = new String[] {
			"E2001AC191081D80000FE075",
			"E2001AC191082780000FE09D",
			"E2001AC191081B80000FE06D",
			"E2001AC191082D80000FE0B5",
			"E2001AC191082A80000FE0A9",
			"E2001AC191082E80000FE0B9",
			"E2001AC191083380000FE0CD",
			"E2001AC191081E80000FE079",
			"E2001AC191082680000FE099",
			"E2001AC191081880000FE061",
	};
	String[] officers = new String[] {
			"E2001AC191084080000FE101",
			"E2001AC191083B80000FE0ED",
			"E2001AC191083980000FE0E5",
			"E2001AC191083F80000FE0FD",
			"E2001AC191082C80000FE0B1",
			"E2001AC191083E80000FE0F9",
			"E2001AC191083A80000FE0E9",
			"E2001AC191082880000FE0A1",
			"E2001AC191082980000FE0A5",
			"E2001AC190BA1B80000F586D",
	};
	String[] VIPs = new String[] {
			"E2001AC191082380000FE08D",
			"E2001AC191082280000FE089",
			"E2001AC191082580000FE095",
			"E2001AC191081980000FE065",
			"E2001AC191081A80000FE069",
			"E2001AC191082480000FE091",
			"E2001AC191082080000FE081",
			"E2001AC191081C80000FE071",
			"E2001AC191081F80000FE07D",
			"E2001AC191083180000FE0C5",
	};
	
	
	public CardsTest1() {
//		"Worker","Officer","Security","VIP"
		Cards cards = new Cards();
		Hashtable hash = new Hashtable();
		hash.put("Worker", workers);
		hash.put("Officer", officers);
		hash.put("Security", securitys);
		hash.put("VIP", VIPs);
		
		Enumeration enums = hash.keys();
		while(enums.hasMoreElements()) {
			String key = (String)enums.nextElement();
			String[] datas= (String[])hash.get(key);
			workRole(cards,key,datas);
		}
		
		String str = JSON.toJSONString(cards);
		System.err.println(str);

	}

	private void workRole(Cards cards,String role,String[] arr) {
		for(int i=0;i<arr.length;i++) {
			Card card = new Card();
			
			card.setId(arr[i].trim());
			card.setName(arr[i].trim());
			
			card.setRole(role);
			
			cards.addCard(card);
		}
	}
	
	public static void main(String[] args) {
		new CardsTest1();
	}

}
