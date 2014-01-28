package com.inesazt.visitors.manager.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 退出登录
 * @author xyc
 *
 */

@WebServlet(name = "LogoutAction", urlPatterns = { "/logout" }, loadOnStartup=0)
public class LogoutAction extends HttpServlet {

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
		
		String retInfo = doAction(request, response);
		
		if(retInfo != null) {
			String callback = request.getParameter("callback");
			if(callback != null) {
				retInfo = callback + "(" + retInfo + ");";
			}
			
			sos.write(retInfo.getBytes("UTF-8"));
		}		
	}
	
	//域用户退出
	private String doAction(HttpServletRequest request, HttpServletResponse response) {

		try {
			request.getSession().setAttribute("username", null);
			response.sendRedirect("login.html");
		} catch (Exception e) {
			e.printStackTrace();
			return "用户退出失败";
		}
		return "";
	}
}
