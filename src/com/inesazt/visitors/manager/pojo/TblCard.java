package com.inesazt.visitors.manager.pojo;

import org.apache.commons.lang.StringUtils;

/**
 * 
 * 卡表
 * @author xyc
 *
 */
public class TblCard {

	private Integer id;
	
	private String cardNo;
	
	private String rfidNo;
	
	private Integer cardStatus;
	
	private String info;
	
	private String role;
	
	private Integer ownerType;//用户类型
	
	public TblCard(){
		
	}
	
	public TblCard(String cardNo, String rfidNo, String cardStatus){
		
		if(StringUtils.isNotEmpty(cardNo)){
			this.setCardNo(cardNo);
		}
		if(StringUtils.isNotEmpty(rfidNo)){
			this.setRfidNo(rfidNo);
		}
		if(StringUtils.isNotEmpty(cardStatus)){
			this.setCardStatus(Integer.parseInt(cardStatus));
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public String getRfidNo() {
		return rfidNo;
	}

	public void setRfidNo(String rfidNo) {
		this.rfidNo = rfidNo;
	}

	public Integer getCardStatus() {
		return cardStatus;
	}
	
	public String getCardStatusDis() {
		
		String cardStatusDis = "未知";
		if(cardStatus != null){
			if(cardStatus == 0){
				cardStatusDis = "失效";
			}
			if(cardStatus == 1){
				cardStatusDis = "未绑定";
			}
			if(cardStatus == 2){
				cardStatusDis = "已绑定";
			}
		}
		return cardStatusDis;
	}

	public void setCardStatus(Integer cardStatus) {
		this.cardStatus = cardStatus;
	}
	
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Integer getOwnerType() {
		return ownerType;
	}

	public void setOwnerType(Integer ownerType) {
		this.ownerType = ownerType;
	}
	
	public String getOwnerTypeDis() {
		
		String ownerTypeDis = "";
		if(ownerType != null && ownerType == 2){
			ownerTypeDis = "厂务人员";
		}
		if(ownerType != null && ownerType == 1){
			ownerTypeDis = "访客";
		}
		return ownerTypeDis;
	}
	
	public boolean isGuest() {
		
		if(ownerType != null && ownerType == 2){
			return false;
		}
		if(ownerType != null && ownerType == 1){
			return true;
		}
		return false;
	}
}
