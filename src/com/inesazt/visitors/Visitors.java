package com.inesazt.visitors;
import java.util.Hashtable;
import java.util.Map;


public class Visitors {

    private Map<String,Visitor> visitors = new Hashtable<String,Visitor>(); 
    
    public Map<String,Visitor> getRows() { return visitors; }
    public void setRows(Map<String,Visitor> visitors) { this.visitors = visitors; }

    public void addVisitor(Visitor visitor) {
    	visitors.put(visitor.getName(), visitor);
    }
    
    public Visitor getVisitor(String name) {
    	return visitors.get(name);
    }

    
 
}
