package com.inesazt.visitors;

import java.util.ArrayList;
import java.util.Date;
import java.util.Random;

import com.alibaba.fastjson.JSON;

public class WorkManager {
	Random rand = new Random();
	
	
	
	private int[] rolePoses = new int[]{
			312717660,1218221390,
			312717660,1218280620,
			312678600,1218279970,
			312655300,1218294350,
	};
	
	private int roleOffsetLon = 10000;
	
	private static WorkManager m_instance = null;
	
	private WorkManager() {
		initCards();
		initDevices();
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
			
			for(int i=0;i<DataEnums.RoleNames.length;i++) {
				String roleName = DataEnums.RoleNames[i];
				String roleLabel = DataEnums.RoleLabels[i];
				for(int j=0;j<DataEnums.Locates.length;j++) {
					Role role = new Role();
					int roleLat = rolePoses[j * 2];
					int roleLon = rolePoses[j * 2 + 1];
					
					String locate = DataEnums.Locates[j];
					role.setId(roleName.substring(0,1) + "_" + locate);
					role.setLocate(DataEnums.Locates[j]);
					role.setName(roleName);
					role.setLabel(roleLabel);
					role.setCount(0);
					
					role.setPos(new Pos(roleLat,roleLon + roleOffsetLon * i));
					
					if(i == 0 && j == 1) {
						role.setWarn(true);
					} else if(i == 1 && j == 0) {
						role.setWarn(true);
					} else if(i == 2 && (j == 0 || j == 1)) {
						role.setWarn(true);
					}
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
			String theRole = DataEnums.RoleNames[r % 4];
			
			visitor.setId(theRole.substring(0,1) + i);
			visitor.setName(theRole + i);
			
			visitor.setGender(DataEnums.Genders[r % 2]);
			visitor.setAge(rand.nextInt(30) + 20);
			visitor.setRole(theRole);
//			visitor.setCreateTime(new Date().getTime());
//			visitor.setInfo("Test role for " + theRole);
			
			r = rand.nextInt(999);
			String theLocate = DataEnums.Locates[r % 4];
			visitor.setLocate(theLocate);
			
			visitors.addVisitor(visitor);
		}
		
		String str = JSON.toJSONString(visitors);
		
		return str;
	}
	
	Cards cards = new Cards();
	
	private void initCards() {
		for(int i=0;i<DataEnums.RoleNames.length;i++) {
			String theRole = DataEnums.RoleNames[i];
			for(int j=0;j<10;j++) {
				Card card = new Card();
				
				card.setId(theRole.substring(0,1) + j);
				card.setName(theRole + j);
				
				card.setRole(theRole);
				
				cards.addCard(card);
			}
		}
	}
	public String listCards() {
		
		String str = JSON.toJSONString(cards);
		
		return str;
	}
	
	
	
	Devices devices = new Devices();
	
	private void initDevices() {
		Device device = new Device();
		device.setId("d0");
		device.setLocate("building1");
		devices.addDevice(device);
		
		device = new Device();
		device.setId("d1");
		device.setLocate("building2");
		devices.addDevice(device);
		
		device = new Device();
		device.setId("d2");
		device.setLocate("building2");
		devices.addDevice(device);
		
		device = new Device();
		device.setId("d3");
		device.setLocate("factory");
		devices.addDevice(device);
		
		device = new Device();
		device.setId("d4");
		device.setLocate("outside");
		devices.addDevice(device);
	}

	public String listDevices() {
		String str = JSON.toJSONString(devices);
		return str;
	}
	
	
	
	
	
	
	
	public String loadEvents(String cardId,String strDate) {
		ArrayList list = new ArrayList();
		
		Event event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d1");
		event.setDeviceLocate("building1");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d2");
		event.setDeviceLocate("building2");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d3");
		event.setDeviceLocate("building2");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d4");
		event.setDeviceLocate("outside");
		event.setTime(new Date().getTime());
		list.add(event);
		
		String str = JSON.toJSONString(list);
		return str;
	}
	
	public String loadAllEvents() {
		ArrayList list = new ArrayList();
		
		Event event = new Event();
		event.setCardId("00000000A");
		event.setCardName("testCard1");
		event.setCardRole("admin");
		event.setDeviceId("d1");
		event.setDeviceLocate("b1");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000B");
		event.setCardName("testCard2");
		event.setCardRole("staff");
		event.setDeviceId("d2");
		event.setDeviceLocate("b2");
		event.setTime(new Date().getTime());
		list.add(event);
		
		event = new Event();
		event.setCardId("00000000C");
		event.setCardName("testCard3");
		event.setCardRole("worker");
		event.setDeviceId("d3");
		event.setDeviceLocate("b2");
		event.setTime(new Date().getTime());
		list.add(event);
		
		String str = JSON.toJSONString(list);
		return str;
	}
	
}
