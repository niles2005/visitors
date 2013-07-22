package com.inesazt.visitors;

import java.util.Date;
import java.util.Random;

import com.alibaba.fastjson.JSON;

public class WorkManager {
	Random rand = new Random();
	
	private String[] autoritys = new String[]{"worker","staff","guard","admin"};
	
	private String[] roleNames = new String[]{"worker","staff","guard","admin"};
	private String[] roleLabels = new String[]{"工人","职员","保安","VIP"};
	private String[] locates = new String[]{"building1","building2","factory","outside"};
	private String[] simpleLocates = new String[]{"b1","b2","f","o"};
	private String[] genders = new String[]{"mail","femail"};
	
	private int[] rolePoses = new int[]{
			312717660,1218221390,
			312717660,1218280620,
			312678600,1218279970,
			312655300,1218294350,
	};
	
	private int roleOffsetLon = 10000;
	
	private int baseLat = 312605060;
	private int baseLon = 1218334470;
	private int offsetLat = -2500;
	private int offsetLon = 10000;	private static WorkManager m_instance = null;
	
	private WorkManager() {
		
	}
	
	public static WorkManager getInstance() {
		if(m_instance == null) {
			m_instance = new WorkManager();
		}
		return m_instance;
	}
	
	private String m_rolesJson = null;
	public String listRoles() {
		if(m_rolesJson == null) {
			Roles roles = new Roles();
			
			for(int i=0;i<roleNames.length;i++) {
				String roleName = roleNames[i];
				String roleLabel = roleLabels[i];
				for(int j=0;j<simpleLocates.length;j++) {
					Role role = new Role();
					int roleLat = rolePoses[j * 2];
					int roleLon = rolePoses[j * 2 + 1];
					
					String locate = simpleLocates[j];
					role.setId(roleName.substring(0,1).toUpperCase() + locate);
					role.setName(roleName);
					role.setLabel(roleLabel);
					role.setCount(0);
					
					role.setPos(new Pos(roleLat,roleLon + roleOffsetLon * i));
					roles.addRole(role);
				}
			}
			
			m_rolesJson = JSON.toJSONString(roles);
		}
		return m_rolesJson;
	}
	
	public String listVisitors() {
		Visitors visitors = new Visitors();
		
		for(int i=0;i<50;i++) {
			Visitor visitor = new Visitor();
			int r = rand.nextInt(100);
			String theAutority = autoritys[r % 4];
			
			visitor.setId(theAutority.substring(0,1) + i);
			visitor.setName(theAutority + i);
			
			visitor.setGender(genders[r % 2]);
			visitor.setAge(rand.nextInt(30) + 20);
			visitor.setAuthority(theAutority);
			visitor.setCreateTime(new Date().getTime());
			visitor.setInfo("Test role for " + theAutority);
			
			visitor.setType("road");
		
			r = rand.nextInt(999);
			String theLocate = locates[r % 4];
			visitor.setLocate(theLocate);
			
			int lat = baseLat + offsetLat * (r / 5);
			int lon = baseLon + offsetLon * (r % 5);
			visitor.setPos(new Pos(lat,lon));
			visitors.addVisitor(visitor);
		}
		
		String str = JSON.toJSONString(visitors);
		
		return str;
	}
	
}
