package com.inesazt.visitors;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/work")
public class WorkServlet extends HttpServlet {
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
			return WorkManager.getInstance().listCards();
		} else if(action.equals("setcard")) {
			String cardId = request.getParameter("id");
			String strName = request.getParameter("name");
			String strRole = request.getParameter("role");
			String strInfo = request.getParameter("info");
			
			return WorkManager.getInstance().setCard(cardId,strName,strRole,strInfo);
		} else if(action.equals("listdevices")) {
			return WorkManager.getInstance().listDevices();
		} else if(action.equals("setdevice")) {
			String cardId = request.getParameter("id");
			String strLocate = request.getParameter("locate");
			String strInfo = request.getParameter("info");
			
			return WorkManager.getInstance().setDevice(cardId,strLocate,strInfo);
		} else if(action.equals("listroles")) {
			return WorkManager.getInstance().listRoles();
		} else if(action.equals("loadevents")) {
			String cardId = request.getParameter("action");
			String strDate = request.getParameter("date");
			return WorkManager.getInstance().loadEvents(cardId,strDate);
		} else if(action.equals("loadallevents")) {
			return WorkManager.getInstance().loadAllEvents();
		}
		return null;
	}
}
