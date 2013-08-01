package com.inesazt.visitors;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;


public class Cards {
	private static ObjectMapper fileData_mapper= new ObjectMapper();
	
    private Map<String,Card> cards = new Hashtable<String,Card>(); 
    
    public Map<String,Card> getGroup() { return cards; }
    public void setGroup(Map<String,Card> cards) { this.cards = cards; }

    public void addCard(Card card) {
    	cards.put(card.getId(), card);
    }
    
    public Card getCard(String cardId) {
    	return cards.get(cardId);
    }

    public Card buildCard(String cardId,long time) {
    	if(cardId == null) {
    		return null;
    	}
    	Card card = cards.get(cardId);
    	if(card == null) {
    		card = new Card();
    		card.setId(cardId);
    		card.setName(cardId);
    		card.setCreateTime(time);
    		card.setActived(true);//default true
    		addCard(card);
    	}
    	return card;
    }

    
	public static Cards buildCards() {
		File cardFile = ServerConfig.getInstance().getCardFile();
		Cards cards = null;
		try {
			if(cardFile.exists()) {
				cards = fileData_mapper.readValue(cardFile, Cards.class);
			} else {
				cards = new Cards();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cards;
	}
    
	public synchronized boolean saveCards() {
		try {
			File cardFile = ServerConfig.getInstance().getCardFile();
			FileOutputStream fos = new FileOutputStream(cardFile);
			JsonGenerator jsonGenerator = fileData_mapper.getJsonFactory().createJsonGenerator(fos, JsonEncoding.UTF8);
			jsonGenerator.writeObject(this);
			return true;
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
	public String setCard(String id,String name,String role,String info,boolean actived) {
		if(id == null) {
			return WebUtil.error("card id is null!");
		}
		id = id.trim();
		if(id.length() == 0) {
			return WebUtil.error("card id is empty!");
		}
		Card card = getCard(id);
		if(card == null) {//insert
			card = new Card();
			card.setId(id);
			if(name != null) {
				card.setName(name);
			}
			if(role != null) {
				card.setRole(role);
			}
			if(info != null) {
				card.setInfo(info);
			}
			card.setActived(actived);
			card.setCreateTime(new Date().getTime());
			this.addCard(card);
		} else {
			if(name != null) {
				card.setName(name);
			}
			if(role != null) {
				card.setRole(role);
			}
			if(info != null) {
				card.setInfo(info);
			}
			card.setActived(actived);
		}
		boolean success = saveCards();
		if(success) {
			return JSON.toJSONString(card);
		} else {
			return WebUtil.failedJSON("update card error!");
		}
	}
	
	public void initFromDB() {
		
	}

	public void checkRegInfo(Hashtable hash) {
		Iterator it = cards.values().iterator();
		int unregCount = 0;
		int regCount = 0;
		int deactiveCount = 0;
		while(it.hasNext()){
			Card card = (Card)it.next();
			if(card.getActived()) {
				if(card.getRole() == null){
					unregCount++;
				} else {
					regCount++;
				}
			} else {
				deactiveCount++;
			}
		}
		hash.put("cardNum", regCount + unregCount);
		hash.put("cardUnregNum", unregCount);
		hash.put("cardDeactiveNum", deactiveCount);
	}
}
