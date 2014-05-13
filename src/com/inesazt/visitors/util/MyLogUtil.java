package com.inesazt.visitors.util;

import org.apache.commons.logging.Log;



public class MyLogUtil {
	
	public static String getExceptionStr(Exception e){
		StackTraceElement[] st=e.getStackTrace();
		e.getLocalizedMessage();
		e.toString();
		StringBuffer stb=new StringBuffer(e+"\r\n");
		for(int i=0;i<st.length;i++){
			stb.append(st[i]+"\r\n");
		}
		return stb.toString();
	}
	
	public static void printlnException(Log log,Exception e,String reason){
		log.error(reason+"\r\n");
		log.error(getExceptionStr(e));
	}
	
}
