package com.inesazt.visitors;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;


public class CardGroup {
	private static ObjectMapper fileData_mapper = new ObjectMapper();
	private Map<String, Card> cards = null;

	public Map<String, Card> getGroup() {
		return cards;
	}
	
	public void setGroup(Map<String, Card> cards) {
		this.cards = cards;
	}
	
	public synchronized void addCard(Card card) {
		cards.put(card.getId(), card);
		card.settheCardGroup(this);
		if (card.getActived()) {
			if (card.getRole() == null) {
				changeRegisterInfo(0,1,0);
			} else {
				changeRegisterInfo(1,0,0);
			}
		} else {
			changeRegisterInfo(0,0,1);
		}
	}
	
	public Card getCard(String id) {
		return cards.get(id);
	}
	
	public static CardGroup doLoad() {
		File cardFile = ServerConfig.getInstance().getCardFile();
		try {
			if (cardFile.exists()) {
				CardGroup cardGroup = fileData_mapper.readValue(cardFile, CardGroup.class);
				cardGroup.initRegInfo();
				return cardGroup;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public synchronized boolean doSave() {
		try {
			File cardFile = ServerConfig.getInstance().getCardFile();
			FileOutputStream fos = new FileOutputStream(cardFile);
			JsonGenerator jsonGenerator = fileData_mapper.getJsonFactory()
					.createJsonGenerator(fos, JsonEncoding.UTF8);
			jsonGenerator.writeObject(this);
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
	
	private int m_regCount = 0;
	private int m_unregCount = 0;
	private int m_deactiveCount = 0;
	
	private void initRegInfo() {
		Iterator it = cards.values().iterator();
		int unregCount = 0;
		int regCount = 0;
		int deactiveCount = 0;
		while (it.hasNext()) {
			Card card = (Card) it.next();
			card.settheCardGroup(this);
			if (card.getActived()) {
				if (card.getRole() == null) {
					unregCount++;
				} else {
					regCount++;
				}
			} else {
				deactiveCount++;
			}
		}
		m_regCount = regCount;
		m_unregCount = unregCount;
		m_deactiveCount = deactiveCount;
//		System.err.println("init card:" + m_regCount + "   " + m_unregCount +  "   " + m_deactiveCount);
	}
	
	protected synchronized void changeRegisterInfo(int regNum, int unregNum, int deactiveNum) {
//		System.err.println("changeRegisterInfo:" + regNum + "   " + unregNum +  "   " + deactiveNum);
		m_regCount += regNum;
		m_unregCount += unregNum;
		m_deactiveCount += deactiveNum;
		
		this.boardCastRegisterInfo();
//		System.err.println("changed card:" + m_regCount + "   " + m_unregCount +  "   " + m_deactiveCount);
	}
	
	private void boardCastRegisterInfo() {
		if(Global.getInstance() != null) {
			Hashtable dataHash = new Hashtable();
			Hashtable regInfoHash = new Hashtable(); 
			this.checkRegInfo(regInfoHash);
			dataHash.put("register", regInfoHash);
			Global.getInstance().broadcastClientData(dataHash);
		}
	}

	public void checkRegInfo(Hashtable hash) {
		hash.put("cardReg", "" + m_regCount);
		hash.put("cardUnreg", "" + m_unregCount);
		hash.put("cardDeactive", "" + m_deactiveCount);
	}
	
	public void checkRegInfo0(Hashtable hash) {
		Iterator it = this.cards.values().iterator();
		int unregCount = 0;
		int regCount = 0;
		int deactiveCount = 0;
		while (it.hasNext()) {
			Card card = (Card) it.next();
			if (card.getActived()) {
				if (card.getRole() == null) {
					unregCount++;
				} else {
					regCount++;
				}
			} else {
				deactiveCount++;
			}
		}
//		System.err.println(m_regCount + "  " + regCount);
//		System.err.println(m_unregCount + "  " + unregCount);
//		System.err.println(m_deactiveCount + "  " + deactiveCount);
		hash.put("cardNum", "" + (regCount + unregCount));
		hash.put("cardUnregNum", "" + unregCount);
		hash.put("cardDeactiveNum", "" + deactiveCount);
	}
	
	public void changeDate() {
		Iterator it = cards.values().iterator();
		while (it.hasNext()) {
			Card card = (Card) it.next();
			card.changeDate();
		}
	}
}
