package com.inesazt.visitors;

import java.util.ArrayList;
import java.util.Date;

import com.alibaba.fastjson.JSON;

public class Card {
	private String id;
	private String name;
	private String role;

	private long createTime;
	private String info;
	
//	private String lastLocate = null;
	private long lastTime = 0;
	private boolean isActived = true;
	
	private CardGroup m_cardGroup = null;
	public void settheCardGroup(CardGroup cardGroup) {
		m_cardGroup = cardGroup;
	}
	
	public boolean getActived() {
		return isActived;
	}

	public void setActived(boolean isActived) {
		if(m_cardGroup != null) {
//			System.err.println("set active:" + isActived);
			if(this.isActived != isActived) {//int regNum,int unregNum,int deactiveNum
				if(isActived) {
					if(role != null) {
						this.m_cardGroup.changeRegisterInfo(1, 0, -1);
					} else {
						this.m_cardGroup.changeRegisterInfo(0, 1, -1);
					}
				} else {
					if(role != null) {
						this.m_cardGroup.changeRegisterInfo(-1, 0, 1);
					} else {
						this.m_cardGroup.changeRegisterInfo(0, -1, 1);
					}
				}
			}
		}
		this.isActived = isActived;
	}

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
		if(m_cardGroup != null) {
//			System.err.println("set role:" + role);
			if(this.isActived) {
				boolean hasOldRole = this.role != null;
				boolean hasNewRole = role != null;
				if(hasOldRole != hasNewRole) {//int regNum,int unregNum,int deactiveNum
					if(role != null) {
						this.m_cardGroup.changeRegisterInfo(1, -1, 0);
					} else {
						this.m_cardGroup.changeRegisterInfo(-1, 1, 0);
					}
				}
			}
		}
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

	public String getLastDeviceId() {
		if(m_eventList.size() > 0) {
			Event lastEvent = m_eventList.get(m_eventList.size() - 1);
			return lastEvent.getDeviceId();
		}
		return "";
	}

	public void setLastDeviceId(String deviceId) {
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
		while(m_eventList.size() > 100) {//超出100时处理
			event = m_eventList.get(0);
			long time = event.getTime();
			String theDate = DateTimeUtil.getDayString(time);
			String today = Global.getInstance().getToday();
			if(today.equals(theDate)) {
				break;
			} else {
				m_eventList.remove(0);
			}
		}
	}
	
	public String loadHistoryEvents(String date) {
		ArrayList list = DBManager.getInstance().queryHistoryEvents(id, date);
		return JSON.toJSONString(list);
	}
	
	public String loadEvents(String date) {
		if(date == null) {//return today events
			date = Global.getInstance().getToday();
		}
		if(Global.getInstance().isToday(date)) {
			while(m_eventList.size() > 0) {
				Event event = m_eventList.get(0);
				long time = event.getTime();
				String theDate = DateTimeUtil.getDayString(time);
				if(date.equals(theDate)) {
					break;
				} else {
					m_eventList.remove(0);
				}
			}
			return JSON.toJSONString(m_eventList);
		}
		ArrayList list = DBManager.getInstance().queryHistoryEvents(id, date);
		return JSON.toJSONString(list);
	}
	
	public String loadTodayEvents() {
		return JSON.toJSONString(m_eventList);
	}
}
