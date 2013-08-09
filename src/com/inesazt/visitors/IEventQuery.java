package com.inesazt.visitors;

import java.util.List;

public interface IEventQuery {    
    public List<Event> selectEvents(EventParam param); 
    public List<Event> selectCardEvents(EventParam param); 
    
}