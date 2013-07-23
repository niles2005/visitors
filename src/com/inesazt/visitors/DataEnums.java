package com.inesazt.visitors;

import com.alibaba.fastjson.JSON;

class DataEnums {
	public static String[] RoleNames = new String[]{"worker","staff","guard","admin"};
	public static String[] RoleLabels = new String[]{"工人","职员","保安","VIP"};

	public static String[] Locates = new String[]{"building1","building2","factory","outside"};

	public static String[] Genders = new String[]{"mail","femail"};
	
	public static String loadLocateEnums(){
		return JSON.toJSONString(Locates);
	}
	
	public static String loadRoleEnums(){
		return JSON.toJSONString(RoleNames);
	}
	
}
