package com.inesazt.visitors;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(name = "TaskServlet", urlPatterns = { "/task" }, loadOnStartup=0)
public class TaskServlet extends HttpServlet implements ServletContextListener {
	private static final long serialVersionUID = 1L;
	
	public void init(ServletConfig servletConfig) throws ServletException {
        try {
        	String realPath = servletConfig.getServletContext().getRealPath("");
        	ServerConfig.initInstance(realPath);
        	Global.getInstance();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
	}

	private java.util.Timer timer = null; 
	public void contextInitialized(ServletContextEvent event) {
		timer = new java.util.Timer(true); 
		timer.schedule(new TaskWorker(event.getServletContext()), 0, TaskWorker.LoopTime);
	}
	
	public void contextDestroyed(ServletContextEvent event) { 
		timer.cancel(); 
	}	
}
