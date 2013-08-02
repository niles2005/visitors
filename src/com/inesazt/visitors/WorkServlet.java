package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet(name = "WorkServlet", urlPatterns = { "/work" }, loadOnStartup=0)
public class WorkServlet extends HttpServlet {
	public void init(ServletConfig servletConfig) throws ServletException {
        try {
        	String realPath = servletConfig.getServletContext().getRealPath("");
        	ServerConfig.initInstance(realPath);
        	Global.initInstance();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		this.doPage(request, response);
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		this.doPage(request, response);
	}
	
	public void doPage(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		request.setCharacterEncoding("UTF-8");
		ServletOutputStream sos = response.getOutputStream();
		response.setContentType("text/html; charset=UTF-8");
		
		String retInfo = doWork(request);
		
		if(retInfo != null) {
			String callback = request.getParameter("callback");
			if(callback != null) {
				retInfo = callback + "(" + retInfo + ");";
			}
			
			sos.write(retInfo.getBytes("UTF-8"));
		}
	}
	
	private String doWork(HttpServletRequest request) {
		String action = request.getParameter("action");
		if(action == null) {
			return WebUtil.error("unknown action!");
		}
		if(action.equals("initdatas")) {
			return Global.getInstance().getInitDatas();
		} else if(action.equals("listcards")) {
			return Global.getInstance().getCards().doList();
		} else if(action.equals("setcard")) {
			String cardId = request.getParameter("id");
			String strName = request.getParameter("name");
			String strRole = request.getParameter("role");
			String strInfo = request.getParameter("info");
			boolean actived = Boolean.parseBoolean(request.getParameter("actived"));
			
			return Global.getInstance().getCards().setCard(cardId,strName,strRole,strInfo,actived);
		} else if(action.equals("listdevices")) {
			return Global.getInstance().getDevices().doList();
		} else if(action.equals("setdevice")) {
			String deviceId = request.getParameter("id");
			String strLocate = request.getParameter("locate");
			String strInfo = request.getParameter("info");
			boolean actived = Boolean.parseBoolean(request.getParameter("actived"));
			
			return Global.getInstance().getDevices().setDevice(deviceId,strLocate,strInfo,actived);
		} else if(action.equals("loadevents")) {
			String cardId = request.getParameter("cardid");
			String strDate = request.getParameter("date");
			Card card = Global.getInstance().getCard(cardId);
			if(card == null) {
				return WebUtil.error("Can not find card for cardId:" + cardId);
			}
			return card.loadEvents(strDate);
		} else if(action.equals("loadtodayevents")) {
			String cardId = request.getParameter("cardid");
			Card card = Global.getInstance().getCard(cardId);
			if(card == null) {
				return WebUtil.error("Can not find card for cardId:" + cardId);
			}
			return card.loadTodayEvents();
		} else if(action.equals("loadallevents")) {
			return Global.getInstance().getEvents().doList();
		} else if(action.equals("enumlocations")) {
			return DataEnums.loadLocateEnums();
		} else if(action.equals("enumroles")) {
			return DataEnums.loadRoleEnums();
		} else if( action.equals("unregister")){
			return Global.getInstance().getUnregister();
		} else if(action.equals("listfeedbacks")){
			return Global.getInstance().getFeedbacks().doList();
		} else if(action.equals("addfeedback")){
			String userName = request.getParameter("username");
			String proposal = request.getParameter("proposal");
			String emailAddress = request.getParameter("email");
			Feedback feedback = new Feedback(userName, proposal, emailAddress,System.currentTimeMillis());
			
			return Global.getInstance().getFeedbacks().updateFeedbacks(feedback);
		}else if(action.equals("addreply")){
			try {
				BufferedReader reader = request.getReader();
				String str = reader.readLine();
				if(str == null) {
					return null;
				}
				StringBuilder strBuff = new StringBuilder();
				while(str != null) {
					strBuff.append(str);
					str = reader.readLine();
				}
				JsonParser parser = new JsonParser();
				JsonObject json = (JsonObject) parser.parse(strBuff.toString());
				
				long createTime = -1;
				String reply = null;
				JsonElement jsonElement = json.get("createtime");
				if(jsonElement != null) {
					createTime = jsonElement.getAsLong();
				}
				jsonElement = json.get("reply");
				if(jsonElement != null) {
					reply = jsonElement.getAsString();
				}
				return Global.getInstance().getFeedbacks().updateReply(createTime,reply);
			} catch(Exception ex) {
				ex.printStackTrace();
			}
		}
		return null;
	}
}
