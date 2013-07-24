package com.inesazt.visitors;

public class Event {
	private String cardId = null;
	private String cardName = null;
	private String cardRole = null;
	private String deviceId = null;

	private Device m_device = null;
	public void setDevice(Device device) {
		this.m_device = device;
	}
	
	public Device fetchDevice() {
		return this.m_device;
	}
	
	private long time = 0;

	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public String getCardName() {
		return cardName;
	}

	public void setCardName(String cardName) {
		this.cardName = cardName;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getDeviceLocate() {
		if(m_device != null) {
			return m_device.getLocate();
		}
		return "";
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public String getCardRole() {
		return cardRole;
	}

	public void setCardRole(String cardRole) {
		this.cardRole = cardRole;
	}
}
