package com.inesazt.visitors;

import java.io.File;

public class ServerConfig {
	private static ServerConfig m_instance = null;
	private File m_appPath = null;
	private File m_WEBINFPath = null;
	private File m_datasPath = null;
	private File m_configPath = null;
	private ServerConfig(File appPath) {
		m_appPath = appPath;
		m_WEBINFPath = new File(appPath,"WEB-INF");
		if(m_WEBINFPath.exists()) {
			m_datasPath = new File(m_WEBINFPath,"datas");
			m_configPath = new File(m_WEBINFPath,"config");
		} else {
			System.err.println("WEB-INF path not found!");
		}
	}

	public static ServerConfig getInstance() {
		return m_instance;
	}
	
	public static void initInstance(String path) {
		if(m_instance != null) {
			return;
		}
		
		m_instance = new ServerConfig(new File(path)); 
	}
	
	public File getDatasPath() {
		return m_datasPath;
	}

	public File getConfigPath() {
		return m_configPath;
	}

}
