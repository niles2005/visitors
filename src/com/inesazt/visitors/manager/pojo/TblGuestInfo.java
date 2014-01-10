package com.inesazt.visitors.manager.pojo;

import org.apache.commons.lang.StringUtils;

/**
 * 访客信息表
 * @author xyc
 *
 */
public class TblGuestInfo {

	private Integer id;//主键
	
	private String attendant;//陪同人
	
	private String cardNo;//卡号
	
	private Integer cardStatus;//卡状态
	
	private String sqNum;
	
	private String timeIn;
	
	private String timeOut;
	
	private String agentName;
	
	private String visitorName;
	
	private String visitorTitle;
	
	private String passId;
	
	private String purpose;
	
	private String carriedStaff;
	
	private String visitArea;
	
	private Integer sameBusiness;
	
	private String country;
	
	private String engName;
	
	private String address;
	
	public final static Integer cardStatus_dead = 0;
	
	public final static Integer cardStatus_unbind = 1;
	
	public final static Integer cardStatus_bind = 2;
	
	public void setField(String fieldName, String fieldValue){
		
		if(StringUtils.isNotEmpty(fieldName)){
			fieldValue = fieldValue != null ? fieldValue : "";
			if(fieldName.endsWith("SQNum")){
				this.setSqNum(fieldValue);
			}
			if(fieldName.endsWith("TimeIn")){
				this.setTimeIn(fieldValue);
			}
			if(fieldName.endsWith("TimeOut")){
				this.setTimeOut(fieldValue);
			}
			if(fieldName.endsWith("AgentName")){
				this.setAgentName(fieldValue);
			}
			if(fieldName.endsWith("VisitorName")){
				this.setVisitorName(fieldValue);
			}
			if(fieldName.endsWith("VisitorTitle")){
				this.setVisitorTitle(fieldValue);
			}
			if(fieldName.endsWith("PassID")){
				this.setPassId(fieldValue);
			}
			if(fieldName.endsWith("Purpose")){
				this.setPurpose(fieldValue);
			}
			if(fieldName.endsWith("CarriedStaff")){
				this.setCarriedStaff(fieldValue);
			}
			if(fieldName.endsWith("VisitArea")){
				this.setVisitArea(fieldValue);
			}
			if(fieldName.endsWith("SameBusiness")){
				if(fieldValue.equals("False")){
					this.setSameBusiness(0);
				}
				if(fieldValue.equals("True")){
					this.setSameBusiness(1);
				}
			}
			if(fieldName.endsWith("Country")){
				this.setCountry(fieldValue);
			}
			if(fieldName.endsWith("EngName")){
				this.setEngName(fieldValue);
			}
			if(fieldName.endsWith("Address")){
				this.setAddress(fieldValue);
			}
		}			
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAttendant() {
		return attendant;
	}

	public void setAttendant(String attendant) {
		this.attendant = attendant;
	}

	public String getSqNum() {
		return sqNum;
	}

	public void setSqNum(String sqNum) {
		this.sqNum = sqNum;
	}

	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public Integer getCardStatus() {
		return cardStatus;
	}

	public void setCardStatus(Integer cardStatus) {
		this.cardStatus = cardStatus;
	}

	public String getTimeIn() {
		return timeIn;
	}

	public void setTimeIn(String timeIn) {
		this.timeIn = timeIn;
	}

	public String getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(String timeOut) {
		this.timeOut = timeOut;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getVisitorName() {
		return visitorName;
	}

	public void setVisitorName(String visitorName) {
		this.visitorName = visitorName;
	}

	public String getVisitorTitle() {
		return visitorTitle;
	}

	public void setVisitorTitle(String visitorTitle) {
		this.visitorTitle = visitorTitle;
	}

	public String getPassId() {
		return passId;
	}

	public void setPassId(String passId) {
		this.passId = passId;
	}

	public String getPurpose() {
		return purpose;
	}

	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}

	public String getCarriedStaff() {
		return carriedStaff;
	}

	public void setCarriedStaff(String carriedStaff) {
		this.carriedStaff = carriedStaff;
	}

	public String getVisitArea() {
		return visitArea;
	}

	public void setVisitArea(String visitArea) {
		this.visitArea = visitArea;
	}

	public Integer getSameBusiness() {
		return sameBusiness;
	}

	public void setSameBusiness(Integer sameBusiness) {
		this.sameBusiness = sameBusiness;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getEngName() {
		return engName;
	}

	public void setEngName(String engName) {
		this.engName = engName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
}
