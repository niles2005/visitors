package com.inesazt.visitors;

import javax.servlet.http.HttpServletRequest;

public class WebUtil {
	public static String error(String info) {
		return "{\"error\":\"" + info + "\"}";
	}
	
	public static String exception(Exception ex) {
		return "{\"exception\":\"" + ex.getMessage() + "\"}";
	}
	
	public static String success(String info) {
		return "{\"success\":\"" + info + "\"}";
	}

	public static String warnning(String info) {
		return "{\"warnning\":\"" + info + "\"}";
	}

	public static String failedJSON(String message) {
    	String ss = "{\"status\":\"failed\",\"message\":\"";
    	ss += message + "\"}";
    	return ss;
	}
	
	public static String oKJSON() {
    	return "{\"status\":\"OK\"}";
	}
	
	public static String getUTFString(HttpServletRequest request,String name) {
		try {
			String value = request.getParameter(name);
			if(value == null) {
				return null;
			}
			return new String(value.getBytes("ISO-8859-1"),"UTF-8");
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
	
}
