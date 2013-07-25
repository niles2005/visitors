package com.inesazt.visitors;

import java.io.File;

import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;

public class Configure {
	private String dbUser = null;
	private String dbPass = null;
	private String dbDriver = null;
	private String dbURL = null;
	
	public String getDbUser() {
		return dbUser;
	}

	public void setDbUser(String dbUser) {
		this.dbUser = dbUser;
	}

	public String getDbPass() {
		return dbPass;
	}

	public void setDbPass(String dbPass) {
		this.dbPass = dbPass;
	}

	public String getDbDriver() {
		return dbDriver;
	}

	public void setDbDriver(String dbDriver) {
		this.dbDriver = dbDriver;
	}

	public String getDbURL() {
		return dbURL;
	}

	public void setDbURL(String dbURL) {
		this.dbURL = dbURL;
	}

	public static Configure buildConfigure() {
		try {
			File configureFile = ServerConfig.getInstance().getConfigureFile();
			if(configureFile.exists() && configureFile.isFile()) {
				ObjectMapper fileData_mapper= new ObjectMapper();
				Configure configure = fileData_mapper.readValue(configureFile, Configure.class);
				return configure;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) {
		Configure conf = new Configure();
		conf.setDbUser("gis");
		conf.setDbPass("gis");
		conf.setDbDriver("oracle.jdbc.driver.OracleDriver");
		conf.setDbURL("jdbc:oracle:thin:@192.168.1.203:1521:UNPAY");
		
		String str = JSON.toJSONString(conf);
		System.err.println(str);
	}

}
