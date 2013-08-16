package com.inesazt.visitors;

import java.util.Date;
import java.util.Hashtable;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class Cards {

	private CardGroup m_cardGroup = null;
	
	public Cards() {
		m_cardGroup = CardGroup.doLoad();
		if(m_cardGroup == null) {
			m_cardGroup = new CardGroup();
		}
	}
	
	public boolean saveCards() {
		return this.m_cardGroup.doSave();
	}

	

	public Map<String, Card> getGroup() {
		return this.m_cardGroup.getGroup();
	}

	public void addCard(Card card) {
		m_cardGroup.addCard(card);
	}
	
	public Card getCard(String cardId) {
		return m_cardGroup.getCard(cardId);
	}

	public Card buildCard(String cardId, long time) {
		if (cardId == null) {
			return null;
		}
		Card card = m_cardGroup.getCard(cardId);
		if (card == null) {
			card = new Card();
			card.setId(cardId);
			card.setName(cardId);
			card.setCreateTime(time);
			card.setActived(true);// default true
			addCard(card);
		}
		return card;
	}

	public String doList() {
		String str = JSON.toJSONString(m_cardGroup);
		// System.err.println(str);
		return str;
	}

	public String setCard(String id, String name, String role, String info,
			boolean actived) {
		if (id == null) {
			return WebUtil.error("card id is null!");
		}
		id = id.trim();
		if (id.length() == 0) {
			return WebUtil.error("card id is empty!");
		}
		Card card = getCard(id);
		if (card == null) {// insert
			card = new Card();
			card.setId(id);
			if (name != null) {
				card.setName(name);
			}
			if (role != null) {
				card.setRole(role);
			}
			if (info != null) {
				card.setInfo(info);
			}
			card.setActived(actived);
			card.setCreateTime(new Date().getTime());
			this.addCard(card);
		} else {
			if (name != null) {
				card.setName(name);
			}
			if (role != null) {
				card.setRole(role);
			}
			if (info != null) {
				card.setInfo(info);
			}
			card.setActived(actived);
		}
		boolean success = saveCards();
		if (success) {
			return JSON.toJSONString(card);
		} else {
			return WebUtil.failedJSON("update card error!");
		}
	}

	public void checkRegInfo(Hashtable hash) {
		this.m_cardGroup.checkRegInfo(hash);
	}
	
	public void changeDate() {
		m_cardGroup.changeDate();
	}
}
