package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.inesazt.visitors.manager.pojo.TblRole;
import com.inesazt.visitors.util.MyLogUtil;


@WebServlet(name = "WorkServlet", urlPatterns = { "/work" }, loadOnStartup=0)
public class WorkServlet extends HttpServlet {
	private static Log log = LogFactory.getLog(WorkServlet.class);
	
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
		
		String retInfo = null;
		try {
			retInfo = doWork(request);
		} catch (Exception e) {
			retInfo = "{\"error\":\""+MyLogUtil.getExceptionStr(e)+"\"}";
			log.error("WorkServlet 发生未知异常：");
			log.error(MyLogUtil.getExceptionStr(e));
		}
		
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
			String strInfo = request.getParameter("info");
			boolean actived = Boolean.parseBoolean(request.getParameter("actived"));
			
			String strRole = null;
			try {
				strRole = URLDecoder.decode(request.getParameter("role") ,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			
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
		}else if(action.equals("doUpdate")){
			int fromIndex = 0;
			String findex = request.getParameter("fromindex");
			if(findex != null && findex.length() > 0){
				fromIndex = Integer.parseInt(findex);
			}
			int regIndex = 0;
			String rIndex = request.getParameter("regIndex");
			if(rIndex != null && rIndex.length() > 0){
				regIndex = Integer.parseInt(rIndex);
			}
			
			int guestUpdateTimes = 0;
			String guTimes = request.getParameter("guestUpdateTimes");
			if(guTimes != null && guTimes.length() > 0){
				guestUpdateTimes = Integer.parseInt(guTimes);
			}
			
			int roleUpdateTimes = 0;
			String ruTimes = request.getParameter("roleUpdateTimes");
			if(ruTimes != null && ruTimes.length() > 0){
				roleUpdateTimes = Integer.parseInt(ruTimes);
			}
			
			String date = request.getParameter("date");
			return Global.getInstance().doClientUpdate(fromIndex,regIndex,guestUpdateTimes,roleUpdateTimes,date);
		}else if(action.equals("enumlocations")) {
			return DataEnums.loadLocateEnums();
		} else if(action.equals("enumroles")) {
			return DataEnums.loadRoleEnums();
		} else if(action.equals("listfeedbacks")){
			return Global.getInstance().getFeedbacks().doList();
		} else if(action.equals("addfeedback")){
			JSONObject jsonObject = this.getJsonFromRequest(request);
			if (jsonObject != null) {
				String userName = null;
				String proposal = null;
				String emailAddress = null;
				userName = jsonObject.getString("username");
				proposal = jsonObject.getString("proposal");
				emailAddress = jsonObject.getString("email");
				Feedback feedback = new Feedback(userName, proposal, emailAddress,System.currentTimeMillis());
				return Global.getInstance().getFeedbacks().updateFeedbacks(feedback);
			}
			
		}else if(action.equals("addreply")){
			JSONObject jsonObject = this.getJsonFromRequest(request);
				if (jsonObject != null) {
					long createTime = -1;
					String reply = null;
					createTime = jsonObject.getLong("createtime");
					reply = jsonObject.getString("reply");
					return Global.getInstance().getFeedbacks().updateReply(createTime, reply);
				}
			
		} else if(action.equals("listroles")){
			return JSON.toJSONString(Global.getInstance().getRoles());
		} else if(action.equals("setrole")){
			String result = null;
			try {
				Integer roleId = -1;
				if (request.getParameter("id") != null) {
					roleId = Integer.parseInt(request.getParameter("id"));
				}
				String roleName = URLDecoder.decode(request.getParameter("name"),"UTF-8");
				String roleAreas = request.getParameter("areas");
				String roleColor = request.getParameter("color");
				String roleIcon = request.getParameter("icon");
				Integer roleStatus = Integer.parseInt(request.getParameter("status"));
				Integer roleType = Integer.parseInt(request.getParameter("roleType"));
				TblRole tblRole = new TblRole(roleName, roleAreas, roleIcon,roleColor, roleStatus, roleType);
				result = Global.getInstance().setRole(roleId, tblRole);
			} catch (Exception e) {
				e.printStackTrace();
				result = WebUtil.error("expection when setrole");
			}
			return result;
		} else if( action.equals("getSession")){
			HttpSession session = request.getSession(true);
			String userName = (String)session.getAttribute("username");
			String authority = (String)session.getAttribute("authority");
			Map<String,String> sessionMap = new HashMap<String,String>();
			sessionMap.put("username", userName);
			sessionMap.put("authority", authority);
			return JSON.toJSONString(sessionMap);
		}
		return null;
	}
	
	private JSONObject getJsonFromRequest(HttpServletRequest request){
		JSONObject json = null;
		
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
				json = JSON.parseObject(strBuff.toString());
			} catch (IOException e) {
				e.printStackTrace();
			}
			
		
		return json;
	}
}
