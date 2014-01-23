package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.inesazt.visitors.manager.bo.ManagerBoImpl;
import com.inesazt.visitors.manager.pojo.TblCard;


public class CardGroup {
	private Map<String, Card> cards = new HashMap<String, Card>();
	private boolean isGuestUpdated = false;
	

	public boolean isGuestUpdated() {
		return isGuestUpdated;
	}

	public void setGuestUpdated(boolean isGuestUpdated) {
		this.isGuestUpdated = isGuestUpdated;
	}

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
				BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(cardFile),"UTF-8"));
				StringBuffer strBuff = new StringBuffer();
				String line = reader.readLine();
				while(line != null) {
					strBuff.append(line);
					line = reader.readLine();
				}
				reader.close();
				CardGroup cardGroup = JSON.parseObject(strBuff.toString(), CardGroup.class);
				cardGroup.initRegInfo();
				return cardGroup;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static CardGroup doLoadFromDB() {
		CardGroup cardGroup = new CardGroup();
		ManagerBoImpl managerBo = new ManagerBoImpl();
		List<TblCard> TblCardList = managerBo.getCardList();
		if(TblCardList.size() > 0) {
			cardGroup.setGroup(new HashMap<String, Card>());
			for ( TblCard tblCard : TblCardList) {
				Card card = new Card(tblCard);
				cardGroup.getGroup().put(tblCard.getRfidNo() , card);
			}
			cardGroup.initRegInfo();
		}
		return cardGroup;
	}
	
	public synchronized boolean doSave() {
		try {
			File cardFile = ServerConfig.getInstance().getCardFile();
			PrintWriter writer = new PrintWriter(new OutputStreamWriter(new FileOutputStream(cardFile),"UTF-8"));
			String jsonTxt = JSON.toJSONString(this);
			writer.write(jsonTxt);
			writer.flush();
			writer.close();
			
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
	
	public synchronized boolean doSaveToDB( Card card ) {
		
		 ManagerBoImpl managerBo = new ManagerBoImpl();
		 return managerBo.updateOrInsertTblCard(card.fetchTblCard());
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
		
		if (Global.getInstance() != null) {
			Global.getInstance().changeRegister();
			//		this.boardCastRegisterInfo();
			//		System.err.println("changed card:" + m_regCount + "   " + m_unregCount +  "   " + m_deactiveCount);
		}
	}
	
//	private void boardCastRegisterInfo() {
//		if(Global.getInstance() != null) {
//			Hashtable dataHash = new Hashtable();
//			Hashtable regInfoHash = new Hashtable(); 
//			this.checkRegInfo(regInfoHash);
//			dataHash.put("register", regInfoHash);
////			Global.getInstance().broadcastClientData(dataHash);
//		}
//	}

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
