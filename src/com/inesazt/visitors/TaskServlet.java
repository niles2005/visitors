package com.inesazt.visitors;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(name = "TaskServlet", urlPatterns = { "/task" }, loadOnStartup=1)
public class TaskServlet extends HttpServlet implements ServletContextListener {
	private static final long serialVersionUID = 1L;
	
	private java.util.Timer timer = null; 
	public void contextInitialized(ServletContextEvent event) {
		timer = new java.util.Timer(true); 
		timer.schedule(new TaskWorker(event.getServletContext()), 0, TaskWorker.LoopTime);
		
		/**
		 * 此邮件为确认邮件，所有访客12小时后自动解绑
		 * 
		 */
//		Calendar cal = Calendar.getInstance();
//		cal.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), cal.get(Calendar.DATE), 24, 0);
//		timer.scheduleAtFixedRate(new UnBindCardWorker(), cal.getTime(), UnBindCardWorker.LoopTime);
	}
	
	public void contextDestroyed(ServletContextEvent event) { 
		timer.cancel(); 
	}	
}
