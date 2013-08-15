package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONReader;
import com.alibaba.fastjson.JSONWriter;

public class Feedbacks {
	private List<Feedback> feedbacks = new ArrayList<Feedback>();
	
	public Feedbacks(){
		
	}
	
	
	public void addFeedback(Feedback feedback){
		feedbacks.add(feedback);
	}
	
	public Feedback getFeedback(int index) {
	    	return feedbacks.get(index);
    }


	public static Feedbacks buildFeedback() {
		Feedbacks feedbacks = new Feedbacks();
		try {
			File feedbackFile = ServerConfig.getInstance().getFeedbackFile();
			
			if(feedbackFile.exists()) {
//				File feedbackFile = new File("D:\\mywork\\inesazt\\workspace\\visitors\\WebContent\\WEB-INF\\config","feedback.json");
				JSONReader jReader = new JSONReader(new BufferedReader(new InputStreamReader(new FileInputStream(feedbackFile),"UTF-8")));
				
				jReader.startArray();
				while(jReader.hasNext()){
					Feedback feedback = jReader.readObject(Feedback.class);
					feedbacks.addFeedback(feedback);
				}
				jReader.endArray();
				jReader.close();
			} 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return feedbacks;
	}
	
	public String doList(){
		return JSON.toJSONString(feedbacks);
	}
	
	public String updateFeedbacks(Feedback feedback){
		addFeedback(feedback);
		saveFeedbacks();
		return JSON.toJSONString(feedbacks);
	}
	
	public String updateReply(long createTime,String reply){
		for(Feedback feedback : feedbacks){
			if(createTime == feedback.getCreateTime()){
				feedback.setReply(reply);
			}
			
		}
		saveFeedbacks();
		return WebUtil.oKJSON();
	}
	
	
	
	public synchronized boolean saveFeedbacks() {
		try {
			File feedbackFile = ServerConfig.getInstance().getFeedbackFile();
			FileOutputStream fos = new FileOutputStream(feedbackFile);
			fos.write(JSON.toJSONString(feedbacks).getBytes("UTF-8"));
			return true;
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		
//		try {
//			File feedbackFile = ServerConfig.getInstance().getFeedbackFile();
//			JSONWriter writer = new JSONWriter(new BufferedWriter(new OutputStreamWriter(new FileOutputStream(feedbackFile),"UTF-8")));
//			writer.startArray();
//			for (int i = 0; i < 20; i++) {
//				for (Feedback feedback : feedbacks) {
//					writer.writeValue(feedback);
//				}
//			}
//			writer.endArray();
//			writer.flush();
//			writer.close();
//			return true;
//		} catch(Exception ex) {
//			ex.printStackTrace();
//		} 
		return false;
	}
	
	public static void main(String [] args){
		Feedbacks feedbacks = new Feedbacks();
		Feedback feedback = new Feedback();
		feedback.setUserName("test");
		feedback.setProposal("aaa");
		feedback.setCreateTime(24354);
		feedbacks.addFeedback(feedback);
		feedbacks.saveFeedbacks();
		
//		Feedbacks feedbacks = Feedbacks.buildFeedback();
//		Feedback feedback = feedbacks.getFeedback(0);
//		System.out.println(feedback.getCreateTime());
//		System.out.println(feedback.getProposal());
//		System.out.println(feedback.getUserName());
	}

}
