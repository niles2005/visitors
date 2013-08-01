package com.inesazt.visitors;

public class Feedback {
	private String userName;
	private String proposal;
	private String email;
	private String reply;
	private long createTime;
	
	public Feedback(){
		
	}
	
	public Feedback(String userName, String proposal, String email,long createTime) {
		this.userName = userName;
		this.proposal = proposal;
		this.email = email;
		this.createTime = createTime;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getProposal() {
		return proposal;
	}
	public void setProposal(String proposal) {
		this.proposal = proposal;
	}
	public String getReply() {
		return reply;
	}
	public void setReply(String reply) {
		this.reply = reply;
	}
	public long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}
	
	
}
