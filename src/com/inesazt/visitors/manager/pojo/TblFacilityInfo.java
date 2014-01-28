package com.inesazt.visitors.manager.pojo;

import org.apache.commons.lang.StringUtils;

public class TblFacilityInfo {

	private Integer id;//主键
	
	private String name;//姓名
	
	private String number;//工号
	
	private String depName;//部门
	
	private String cardNo;//卡号
	
	private Integer cardStatus;//卡状态
	
	public final static Integer cardStatus_dead = 0;
	
	public final static Integer cardStatus_unbind = 1;
	
	public final static Integer cardStatus_bind = 2;	
	
	public TblFacilityInfo(){
		
	}

	public TblFacilityInfo(String name, String number, String cardStatus){
		
		if(StringUtils.isNotEmpty(name)){
			this.name = name;
		}
		if(StringUtils.isNotEmpty(number)){
			this.number = number;
		}
		if(StringUtils.isNotEmpty(cardStatus)){
			this.cardStatus = Integer.parseInt(cardStatus);
		}
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
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
	
	
}
