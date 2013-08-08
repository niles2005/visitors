package com.inesazt.visitors;

import java.util.Calendar;
import java.util.Date;

public class DateTimeUtil {

	public static String getDayString(Date date) {
		return getDayString(date.getTime());
	}

	public static String getDayString(long millisTime) {
		Calendar cal = Calendar.getInstance();
		
		cal.setTimeInMillis(millisTime);
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DAY_OF_MONTH);
		String retDate = "" + year;
		if(month < 10) {
			retDate += "0";
		}
		retDate += month;
		if(day < 10) {
			retDate += "0";
		}
		retDate += day;
		return retDate;
	}


	public static String getDayString(long millisTime,int offsetDays) {
		Calendar cal = Calendar.getInstance();
		
		cal.setTimeInMillis(millisTime);
		
		cal.add(Calendar.DATE, offsetDays);
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DAY_OF_MONTH);
		String retDate = "" + year;
		if(month < 10) {
			retDate += "0";
		}
		retDate += month;
		if(day < 10) {
			retDate += "0";
		}
		retDate += day;
		return retDate;
	}


	public static String getTodayString() {
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DAY_OF_MONTH);
		String date = "" + year;
		if(month < 10) {
			date += "0";
		}
		date += month;
		if(day < 10) {
			date += "0";
		}
		date += day;
		return date;
	}

	
	public static String date8ToDate10(String strDate) {
		if(strDate.length() == 8) {
			return strDate.substring(0,4) + "/" + strDate.substring(4,6) + "/" + strDate.substring(6);
		} else if(strDate.length() == 10) {
			return strDate;
		}
		return null;
	}
	
	public static String date8ToSimpleDate10(String strDate) {
		if(strDate.length() == 8) {
			String year = strDate.substring(0,4);
			String month = strDate.substring(4,6);
			String day = strDate.substring(6);
			if(month.startsWith("0")) {
				month = month.substring(1);
			}
			if(day.startsWith("0")) {
				day = day.substring(1);
			}
			return year + "/" + month + "/" + day;
		} else if(strDate.length() == 10) {
			String year = strDate.substring(0,4);
			String month = strDate.substring(5,7);
			String day = strDate.substring(8);
			if(month.startsWith("0")) {
				month = month.substring(1);
			}
			if(day.startsWith("0")) {
				day = day.substring(1);
			}
			return year + "/" + month + "/" + day;
		}
		return null;
	}
	
	public static String date10ToDate8(String strDate) {
		if(strDate.length() == 10) {
			return strDate.substring(0,4) + strDate.substring(5,7) + strDate.substring(8);
		} else if(strDate.length() == 8) {
			return strDate;
		}
		return null;
	}
}
