package com.inesazt.visitors;

import java.util.ArrayList;

import com.alibaba.fastjson.JSON;

public class Card {
	private String id;
	private String name;
	private String role;

	private long createTime;
	private String info;
	
//	private String lastLocate = null;
	private long lastTime = 0;

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getLastLocate() {
		if(m_eventList.size() > 0) {
			Event lastEvent = m_eventList.get(m_eventList.size() - 1);
			return lastEvent.getDeviceLocate();
		}
		return "";
	}

	public void setLastLocate(String lastLocate) {
		//empty method
	}

	public long getLastTime() {
		if(m_eventList.size() > 0) {
			Event lastEvent = m_eventList.get(m_eventList.size() - 1);
			return lastEvent.getTime();
		}
		return -1;
	}

	public void setLastTime(long lastTime) {
	}
	
	private ArrayList<Event> m_eventList = new ArrayList<Event>();
	public void appendEvent(Event event) {
		m_eventList.add(event);
	}
	
	public String loadHistoryEvents(String date) {
		ArrayList list = DBManager.getInstance().queryHistoryEvents(id, date);
		return JSON.toJSONString(list);
	}
	
	public String loadTodayEvents() {
		return JSON.toJSONString(m_eventList);
	}
}
