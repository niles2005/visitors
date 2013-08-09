package com.inesazt.visitors;

public class Event {
	private int seqId = 0;
	private String cardId = null;
	private String macAddress = null;
	private String antId = null;
	private String upDate = null;
	private String upTime = null;
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

	public int getSeqId() {
		return seqId;
	}

	public void setSeqId(int seqId) {
		this.seqId = seqId;
	}

	public String getMacAddress() {
		return macAddress;
	}

	public void setMacAddress(String macAddress) {
		this.macAddress = macAddress;
	}

	public String getAntId() {
		return antId;
	}

	public void setAntId(String antId) {
		this.antId = antId;
	}

	public String getUpDate() {
		return upDate;
	}

	public void setUpDate(String upDate) {
		this.upDate = upDate;
	}

	public String getUpTime() {
		return upTime;
	}

	public void setUpTime(String upTime) {
		this.upTime = upTime;
	}
	
	public void doInit() {
		
	}
}
