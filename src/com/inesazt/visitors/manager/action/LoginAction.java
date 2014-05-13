package com.inesazt.visitors.manager.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.inesazt.visitors.manager.bo.LoginBoImpl;
import com.inesazt.visitors.manager.cfg.Config;

/**
 * 用户域登录
 * 通过域名和密码来登录访客管理系统
 * 用户通过LoginBoImpl类来验证是否登录成功
 * @author xyc
 *
 */

@WebServlet(name = "LoginAction", urlPatterns = { "/login" }, loadOnStartup=0)
public class LoginAction  extends HttpServlet {
	
	private LoginBoImpl loginBoImpl = new LoginBoImpl();
	
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
	
	//域用户登录
	private String doAction(HttpServletRequest request, HttpServletResponse response) {

		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String addr = "ldap://10.71.5.80:389";
		try {
			Config cfg = Config.getInstance();
			if(!cfg.getISTEST()){//生产环境
				boolean auth = loginBoImpl.userAuthenticate(username, password, addr);
				if(auth){
					request.getSession().setAttribute("username", username);
					request.getSession().setAttribute("authority", cfg.getAuthority(username));
					response.sendRedirect("");
				}else{
					return "用户登录验证失败";
				}
			}else{//测试环境
				request.getSession().setAttribute("username", username);
				request.getSession().setAttribute("authority", cfg.getAuthority(username));
				response.sendRedirect("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "用户登录验证失败";
		}
		return "";
	}
}
