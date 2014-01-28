package com.inesazt.visitors;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblFacilityInfo;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;

public class Card {
	private TblCard m_tblCard;
	private boolean isActived = true;
	
	private CardGroup m_cardGroup = null;
	
	public Card(){
		m_tblCard = new TblCard();
	}
	
	public Card(TblCard tblCard){
		m_tblCard = tblCard;
	}
	
	public void setTblCard(TblCard tblCard){
		m_tblCard = tblCard;
	}
	
	public TblCard fetchTblCard(){
		return m_tblCard;
	}
	
	public void settheCardGroup(CardGroup cardGroup) {
		m_cardGroup = cardGroup;
	}
	
	public boolean getActived() {
		if(m_tblCard.getCardStatus()!= null && m_tblCard.getCardStatus() > 0){
			isActived = true;
		}else{
			isActived = false;
		}
		return isActived;
	}
	
	//remove last date events
	public void changeDate() {
		String today = Global.getInstance().getToday();
		while(m_eventList.size() > 0) {
			Event event = m_eventList.get(0);
			long time = event.getTime();
			String theDate = DateTimeUtil.getDayString(time);
			if(today.equals(theDate)) {
				break;
			} else {
				m_eventList.remove(0);
			}
		}
	}
	
	public void setActived(boolean isActived) {
		if(m_cardGroup != null) {
//			System.err.println("set active:" + isActived);
			if(this.getActived() != isActived) {//int regNum,int unregNum,int deactiveNum
				if(isActived) {
					if( m_tblCard.getCardStatus() == null || m_tblCard.getCardStatus() <= 0){
						m_tblCard.setCardStatus(1);
					}
					if(m_tblCard.getRole() != null) {
						this.m_cardGroup.changeRegisterInfo(1, 0, -1);
					} else {
						this.m_cardGroup.changeRegisterInfo(0, 1, -1);
					}
				} else {
					m_tblCard.setCardStatus(0);
					if(m_tblCard.getRole() != null) {
						this.m_cardGroup.changeRegisterInfo(-1, 0, 1);
					} else {
						this.m_cardGroup.changeRegisterInfo(0, -1, 1);
					}
				}
			}
		}
		this.isActived = isActived;
	}

	public String getInfo() {
		return m_tblCard.getInfo();
	}

	public void setInfo(String info) {
		m_tblCard.setInfo(info);
	}

	public String getName() {
		return m_tblCard.getCardNo();
	}

	public void setName(String name) {
		if (name != null) {
			m_tblCard.setCardNo(name.trim()) ;
		}
	}

	public String getId() {
		return m_tblCard.getRfidNo();
	}

	public void setId(String id) {
		if (id != null) {
			m_tblCard.setRfidNo(id.trim());
		}
	}
	
	public int fetchStatus(){
		return m_tblCard.getCardStatus();
	}
	
	public void setStatus(int cardStatus){
		m_tblCard.setCardStatus(cardStatus);
	}

	public String getRole() {
		return m_tblCard.getRole();
	}

	public void setRole(String role) {
		if(m_cardGroup != null) {
			if(this.getActived()) {
				boolean hasOldRole = m_tblCard.getRole() != null;
				boolean hasNewRole = role != null;
				if(hasOldRole != hasNewRole) {//int regNum,int unregNum,int deactiveNum
					if(role != null) {
						role = role.trim();
						this.m_cardGroup.changeRegisterInfo(1, -1, 0);
					} else {
						this.m_cardGroup.changeRegisterInfo(-1, 1, 0);
					}
					
				}
			}
		}
		m_tblCard.setRole(role);
	}
	
	public String getLastLocate() {
		if(m_lastEvent != null) {
			return m_lastEvent.getDeviceLocate();
		}
		return "";
	}
	
	public String getLastDeviceId() {
		if(m_lastEvent != null) {
			return m_lastEvent.getDeviceId();
		}
		return "";
	}
	
	public long getLastTime() {
		if(m_lastEvent != null) {
			return m_lastEvent.getTime();
		}
		return -1;
	}
	
	
	private Event m_lastEvent = null;
	private ArrayList<Event> m_eventList = new ArrayList<Event>();
	public void appendEvent(Event event) {
		m_lastEvent = event;
		m_eventList.add(event);
	}
	
	public String loadHistoryEvents(String date) {
		List list = Global.getInstance().getEvents().queryHistoryEvents(m_tblCard.getRfidNo(), date);
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
			for(int i=0;i<m_eventList.size();i++) {
				Event event = m_eventList.get(i);
//				System.err.println(i + "  "  + event.getCardId() + "  " + event.getUpDate() + "  " + event.getUpTime());
			}
			return JSON.toJSONString(m_eventList);
		}
		List list = Global.getInstance().getEvents().queryHistoryEvents(m_tblCard.getRfidNo(), date);
		return JSON.toJSONString(list);
	}
	
	public String loadTodayEvents() {
		return JSON.toJSONString(m_eventList);
	}
	
	private TblGuestInfo m_guest = null;
	public void setGuest(TblGuestInfo guest) {
		m_guest = guest;
		m_cardGroup.setGuestUpdated(true);
	}
	
	public TblGuestInfo getGuest() {
		return m_guest;
	}
	
	public boolean isGuest(){
		return m_tblCard.isGuest();
	}
	
	public Integer getOwnerType(){
		return m_tblCard.getOwnerType();
	}
	
	private TblFacilityInfo m_facility = null;
	public void setFacility(TblFacilityInfo facility) {
		m_facility = facility;
		m_cardGroup.setGuestUpdated(true);
	}
	
	public TblFacilityInfo getFacility() {
		return m_facility;
	}
	
	
}
