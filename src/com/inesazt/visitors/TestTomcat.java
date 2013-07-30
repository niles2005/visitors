package com.inesazt.visitors;

import org.apache.catalina.core.AprLifecycleListener;
import org.apache.catalina.core.StandardServer;
import org.apache.catalina.startup.Tomcat;

/**
 * Copyright(c) 2010 XTWSoft, Inc. Date:2012-11-6 ����11:14:01 Author: NieLei
 * E-mail: niles2010@live.cn
 */

public class TestTomcat {
	public TestTomcat() {
		startTomcat1();
	}

	final String CATALINA_HOME = ".";

	public void startTomcat1() {
		try {
			Tomcat tomcat = new Tomcat();
			tomcat.setBaseDir(CATALINA_HOME);
			tomcat.setPort(8081);
			tomcat.getConnector().setURIEncoding("UTF-8");
			tomcat.addWebapp("/visitors",
					"WebContent");
			tomcat.start();
			System.out.println("Started tomcat");
			tomcat.getServer().await(); // Keeps Tomcat running until it is shutdown
		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

	private void startTomcat2() {
		try {

			Tomcat tomcat = new Tomcat();
			tomcat.setBaseDir(CATALINA_HOME);
			tomcat.setPort(8081);

			String appBase = "WebContent";

			tomcat.getHost().setAppBase(appBase);

			String contextPath = "/visitors";

			// Add AprLifecycleListener
			StandardServer server = (StandardServer) tomcat.getServer();
			AprLifecycleListener listener = new AprLifecycleListener();
			server.addLifecycleListener(listener);

			tomcat.addWebapp(contextPath, appBase);
			tomcat.start();
			tomcat.getServer().await();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		new TestTomcat();
	}

}
