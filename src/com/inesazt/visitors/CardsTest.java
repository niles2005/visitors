package com.inesazt.visitors;

import com.alibaba.fastjson.JSON;

public class CardsTest {
	public CardsTest() {
		Cards cards = new Cards();
		
		for(int i=0;i<DataEnums.RoleNames.length;i++) {
			String theRole = DataEnums.RoleNames[i];
			for(int j=0;j<10;j++) {
				Card card = new Card();
				
				card.setId(theRole.substring(0,1) + j);
				card.setName(theRole + j);
				
				card.setRole(theRole);
				
				cards.addCard(card);
			}
		}
		String str = JSON.toJSONString(cards);
		System.err.println(str);

	}

	public static void main(String[] args) {
		new CardsTest();
	}

}
