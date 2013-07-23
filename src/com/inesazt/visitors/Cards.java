package com.inesazt.visitors;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Hashtable;
import java.util.Map;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;


public class Cards {
	private static ObjectMapper fileData_mapper= new ObjectMapper();

    private Map<String,Card> cards = new Hashtable<String,Card>(); 
    
    public Map<String,Card> getRows() { return cards; }
    public void setRows(Map<String,Card> cards) { this.cards = cards; }

    public void addCard(Card Card) {
    	cards.put(Card.getId(), Card);
    }
    
    public Card getCard(String cardId) {
    	return cards.get(cardId);
    }

    
	public static Cards buildCards() {
		File cardFile = ServerConfig.getInstance().getCardFile();
		Cards cards = null;
		try {
			if(cardFile.exists()) {
				cards = new Cards();
			} else {
				cards = fileData_mapper.readValue(cardFile, Cards.class);
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

	public String setCard(String id,String name,String role,String info) {
		Card card = getCard(id);
		if(card == null) {
			return WebUtil.error("Can not find card:" + id);
		}
		if(name != null) {
			card.setName(name);
		}
		if(role != null) {
			card.setRole(role);
		}
		if(info != null) {
			card.setInfo(info);
		}
		String str = JSON.toJSONString(card);
		return str;
	}
	
	public void initFromDB() {
		
	}

	
}
