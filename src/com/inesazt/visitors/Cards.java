package com.inesazt.visitors;

import java.util.Hashtable;
import java.util.Map;


public class Cards {

    private Map<String,Card> cards = new Hashtable<String,Card>(); 
    
    public Map<String,Card> getRows() { return cards; }
    public void setRows(Map<String,Card> cards) { this.cards = cards; }

    public void addCard(Card Card) {
    	cards.put(Card.getId(), Card);
    }
    
    public Card getCard(String cardId) {
    	return cards.get(cardId);
    }

    
 
}
