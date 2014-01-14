package com.inesazt.visitors.manager.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.inesazt.visitors.WebUtil;
import com.inesazt.visitors.manager.bo.ManagerBoImpl;

/**
 * 管理平台的总入口
 * @author xyc
 *
 */

@WebServlet(name = "ManagerAction", urlPatterns = { "/mg" }, loadOnStartup=0)
public class ManagerAction extends HttpServlet {
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		doPage(request, response);
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		doPage(request, response);
	}
	
	public void doPage(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
		request.setCharacterEncoding("UTF-8");
		ServletOutputStream sos = response.getOutputStream();
		response.setContentType("text/html; charset=UTF-8");
		
		String retInfo = doAction(request);
		
		if(retInfo != null) {
			String callback = request.getParameter("callback");
			if(callback != null) {
				retInfo = callback + "(" + retInfo + ");";
			}
			
			sos.write(retInfo.getBytes("UTF-8"));
		}		
	}

	//入口
	private String doAction(HttpServletRequest request) {

		String action = request.getParameter("action");
		if(action == null) {
			return WebUtil.error("unknown action!");
		}
		//获取访客列表
		if(action.equals("getGuestList")) {
			String attendantCode = request.getParameter("attendantCode");
			String cardStatus = request.getParameter("cardStatus");
			ManagerBoImpl managerBo = new ManagerBoImpl();
			return managerBo.getGuestList(attendantCode, cardStatus);
		}
		
		//获取未绑定卡列表
		if(action.equals("getUnBindCardList")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			return managerBo.getUnBindCardList();
		}
		
		//保存绑定关系
		if(action.equals("saveBind")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			String binds = request.getParameter("binds");
			return managerBo.saveBind(binds);
		}
		
		//删除绑定关系
		if(action.equals("deleteBind")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			String binds = request.getParameter("binds");
			return managerBo.deleteBind(binds);
		}
		
		return "can not find any action named by " + action + "!";
		
	}
	
	
	
}
