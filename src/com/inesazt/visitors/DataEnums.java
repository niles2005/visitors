package com.inesazt.visitors;

import com.alibaba.fastjson.JSON;

class DataEnums {
	public static String[] RoleNames = new String[]{"Worker","Office","Security","VIP"};
	public static String[] RoleLabels = new String[]{"Worker","Office","Security","VIP"};

	public static String[] Locates = new String[]{"building1","building2","factory","outside"};

	public static String[] Genders = new String[]{"mail","femail"};
	
	public static String loadLocateEnums(){
		return JSON.toJSONString(Locates);
	}
	
	public static String loadRoleEnums(){
		return JSON.toJSONString(RoleNames);
	}
	
}
