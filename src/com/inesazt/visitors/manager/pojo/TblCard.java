package com.inesazt.visitors.manager.pojo;

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

	public void setCardStatus(Integer cardStatus) {
		this.cardStatus = cardStatus;
	}
	
}
