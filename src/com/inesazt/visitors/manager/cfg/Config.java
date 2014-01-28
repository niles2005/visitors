package com.inesazt.visitors.manager.cfg;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.Properties;

import com.inesazt.visitors.ServerConfig;

/**
 * 环境配置
 * @author xyc
 *
 */
public class Config {

	private static Properties m_prop = new Properties(); 
	
	private static Config m_instance = null;
	
	public Config() {
		try {
			ServerConfig cfg = ServerConfig.getInstance();
			String cfgPath = cfg.getConfigPath().getAbsolutePath();
			m_prop.load(new BufferedReader(new InputStreamReader(new FileInputStream(cfgPath + "\\setting.conf"),"UTF-8")));
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public static Config getInstance() {
		if(m_instance == null) {
			m_instance = new Config();
		}
		return m_instance;
	}
	
	public boolean getISTEST(){
		
		return Boolean.parseBoolean((String)m_prop.get("isTest"));
	}
}
