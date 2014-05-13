package com.inesazt.visitors.manager.cfg;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Date;
import java.util.Properties;

import com.inesazt.visitors.ServerConfig;

/**
 * 环境配置
 * @author xyc
 *
 */
public class Config {

	private static Properties m_prop = new Properties(); 
	
	private static Properties role_prop = new Properties();
	
	private static Properties area_prop = new Properties();
	
	private static Config m_instance = null;
	
	private static String m_prop_path;
	
	private static String role_prop_path;
	
	private static String area_prop_path;
	
	public Config() {
		try {
			ServerConfig cfg = ServerConfig.getInstance();
			String cfgPath = cfg.getConfigPath().getAbsolutePath();
			m_prop_path = cfgPath + "\\setting.conf";
			role_prop_path = cfgPath + "\\role.conf";
			area_prop_path = cfgPath + "\\area.conf";
			m_prop.load(new BufferedReader(new InputStreamReader(new FileInputStream(m_prop_path),"UTF-8")));
			role_prop.load(new BufferedReader(new InputStreamReader(new FileInputStream(role_prop_path),"UTF-8")));
			area_prop.load(new BufferedReader(new InputStreamReader(new FileInputStream(area_prop_path),"UTF-8")));
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
	
	//m_prop
	public boolean getISTEST(){
		
		return Boolean.parseBoolean((String)m_prop.get("isTest"));
	}
	
	//area_prop
	public String getVisitAreaDis(String area){
		
		return (String)area_prop.get(area.toString());
	}
	
	//role_prop
	public void setAuthority(String number, Object role){
		
		try{
			role_prop.setProperty(number, role.toString());
			OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(role_prop_path),"UTF-8");
			role_prop.store(out, number + " changeRole-- " + new Date());
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	//role_prop
	public String getAuthority(String number){
		String role = (String)role_prop.get(number);
		if(role == null){
			role = "other";
		}
		return role;
	}
}
