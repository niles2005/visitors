package com.inesazt.visitors;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "WorkServlet", urlPatterns = { "/work" }, loadOnStartup=0)
public class WorkServlet extends HttpServlet {
	public void init(ServletConfig servletConfig) throws ServletException {
        try {
        	String realPath = servletConfig.getServletContext().getRealPath("");
        	ServerConfig.initInstance(realPath);
        	DBManager.getInstance();
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
		if(action.equals("listcards")) {
			return Global.getInstance().getCards().doList();
		} else if(action.equals("setcard")) {
			String cardId = request.getParameter("id");
			String strName = request.getParameter("name");
			String strRole = request.getParameter("role");
			String strInfo = request.getParameter("info");
			
			return Global.getInstance().getCards().setCard(cardId,strName,strRole,strInfo);
		} else if(action.equals("listdevices")) {
			return Global.getInstance().getDevices().doList();
		} else if(action.equals("setdevice")) {
			String cardId = request.getParameter("id");
			String strLocate = request.getParameter("locate");
			String strInfo = request.getParameter("info");
			
			return Global.getInstance().getDevices().setDevice(cardId,strLocate,strInfo);
		} else if(action.equals("loadhistoryevents")) {
			String cardId = request.getParameter("cardid");
			String strDate = request.getParameter("date");
			Card card = Global.getInstance().getCard(cardId);
			if(card == null) {
				return WebUtil.error("Can not find card for cardId:" + cardId);
			}
			return card.loadHistoryEvents(strDate);
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
		} else if( action.equals("cardsunreg")){
			return Global.getInstance().getUnregister();
		} else if( action.equals("devicesunreg")){
			
		}
		return null;
	}
}
