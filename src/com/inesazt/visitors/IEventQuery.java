package com.inesazt.visitors;

import java.util.List;

public interface IEventQuery {    
//    public List<Event> selectEvents(EventParam param); 
//    public List<Event> selectCardEvents(EventParam param); 
    
    public List<Event> selectEvents(Event param); 
    public List<Event> selectCardEvents(Event param); 
    public void insertGoOutEvents(Event param);
    
}