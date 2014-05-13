package com.inesazt.visitors.manager.test;

import junit.framework.TestCase;

import com.inesazt.visitors.manager.bo.LoginBoImpl;
import com.inesazt.visitors.manager.bo.ManagerBoImpl;

public class ManagerTest extends TestCase {

	public void testGetGuestList() {
		
		try{
			//ManagerBoImpl bo = new ManagerBoImpl();
			//bo.getGuestList("ds006", null);
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public void testGetAdInfo() {
		
		try{
			LoginBoImpl bo = new LoginBoImpl();
			bo.userAuthenticate("Cheng Li 15849", "1986Licheng!", "ldap://10.71.5.80:389");
			
		}catch(Exception e){
			e.printStackTrace();
		}		
	}
}
