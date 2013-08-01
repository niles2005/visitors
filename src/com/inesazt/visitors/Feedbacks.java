package com.inesazt.visitors;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSONReader;

public class Feedbacks {
	private static ObjectMapper fileData_mapper= new ObjectMapper();

	private List<Feedback> feedbacks = new ArrayList<Feedback>();
	
	public Feedbacks(){
		
	}
	
	
	public void addFeedback(Feedback feedback){
		feedbacks.add(feedback);
	}
	
	public Feedback getFeedback(int index) {
	    	return feedbacks.get(index);
    }


	public static Feedbacks readFeedback() {

		Feedbacks feedbacks = new Feedbacks();
		try {
//			File feedbackFile = ServerConfig.getInstance().getFeedbackFile();
			File feedbackFile = new File("D:\\mywork\\inesazt\\workspace\\visitors\\WebContent\\WEB-INF\\config","feedback.json");
			JSONReader jReader = new JSONReader(new FileReader(feedbackFile));
			
			
			if(feedbackFile.exists()) {
				
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
	
	public synchronized boolean saveFeedbacks() {
		try {
//			File feedbackFile = ServerConfig.getInstance().getFeedbackFile();
//			FileOutputStream fos = new FileOutputStream(feedbackFile);
			FileOutputStream fos = new FileOutputStream(new File("D:\\mywork\\inesazt\\workspace\\visitors\\WebContent\\WEB-INF\\config","feedback.json"));
			JsonGenerator jsonGenerator = fileData_mapper.getJsonFactory().createJsonGenerator(fos, JsonEncoding.UTF8);
			jsonGenerator.writeObject(feedbacks);
			return true;
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
	
	public static void main(String [] args){
//		Feedbacks feedbacks = new Feedbacks();
//		Feedback feedback = new Feedback();
//		feedback.setUserName("test");
//		feedback.setProposal("aaa");
//		feedback.setCreateTime(24354);
//		feedbacks.addFeedback(feedback);
//		feedbacks.saveFeedbacks();
		
		Feedbacks feedbacks = Feedbacks.readFeedback();
		Feedback feedback = feedbacks.getFeedback(0);
		System.out.println(feedback.getCreateTime());
		System.out.println(feedback.getProposal());
		System.out.println(feedback.getUserName());
	}

}
