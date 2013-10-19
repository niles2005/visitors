package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class DeviceGroup {
	private Map<String, Device> devices = null;

	public Map<String, Device> getGroup() {
		return devices;
	}
	
	public void setGroup(Map<String, Device> devices) {
		this.devices = devices;
	}
	
	public synchronized void addDevice(Device device) {
		devices.put(device.getId(), device);
		device.settheDeviceGroup(this);
		if (device.getActived()) {
			
			if (device.getLocate() == null) {
//				System.err.println("=========device.getId() Actived and locate is null"+device.getId());
				changeRegisterInfo(0,1,0);
			} else {
//				System.err.println("==========device.getId() Actived and locate not null"+device.getId());
				changeRegisterInfo(1,0,0);
			}
		} else {
//			System.out.println("============device.getId() not Actived"+device.getId());
			changeRegisterInfo(0,0,1);
		}
	}
	
	public Device getDevice(String id) {
		return devices.get(id);
	}
	
	public static DeviceGroup doLoad() {
		File deviceFile = ServerConfig.getInstance().getDeviceFile();
		try {
			if (deviceFile.exists()) {
				BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(deviceFile),"UTF-8"));
				StringBuffer strBuff = new StringBuffer();
				String line = reader.readLine();
				while(line != null) {
					strBuff.append(line);
					line = reader.readLine();
				}
				reader.close();
				DeviceGroup deviceGroup = JSON.parseObject(strBuff.toString(), DeviceGroup.class);
				deviceGroup.initRegInfo();
				return deviceGroup;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public synchronized boolean doSave() {
		try {
			File deviceFile = ServerConfig.getInstance().getDeviceFile();
			
			PrintWriter writer = new PrintWriter(new OutputStreamWriter(new FileOutputStream(deviceFile),"UTF-8"));
			String jsonTxt = JSON.toJSONString(this);
			writer.write(jsonTxt);
			writer.flush();
			writer.close();
			
			return true;
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
	
	private int m_regCount = 0;
	private int m_unregCount = 0;
	private int m_deactiveCount = 0;
	
	private void initRegInfo() {
		Iterator it = devices.values().iterator();
		int unregCount = 0;
		int regCount = 0;
		int deactiveCount = 0;
		while (it.hasNext()) {
			Device device = (Device) it.next();
			device.settheDeviceGroup(this);
			if (device.getActived()) {
				if (device.getLocate() == null) {
					unregCount++;
				} else {
					regCount++;
				}
			} else {
				deactiveCount++;
			}
		}
		m_regCount = regCount;
		m_unregCount = unregCount;
		m_deactiveCount = deactiveCount;
//		System.err.println("init device:" + m_regCount + "   " + m_unregCount +  "   " + m_deactiveCount);
	}
	
	protected synchronized void changeRegisterInfo(int regNum, int unregNum, int deactiveNum) {
//		System.err.println("changeRegisterInfo:" + regNum + "   " + unregNum +  "   " + deactiveNum);
		m_regCount += regNum;
		m_unregCount += unregNum;
		m_deactiveCount += deactiveNum;
//		System.err.println("-----------------------remove changeRegister--------------");
		if (Global.getInstance() != null) {
			Global.getInstance().changeRegister(); //modify 1018
		}
		
//		this.boardCastRegisterInfo();
//		System.err.println("changed device:" + m_regCount + "   " + m_unregCount +  "   " + m_deactiveCount);
	}
	
//	private void boardCastRegisterInfo() {
//		if(Global.getInstance() != null) {
//			Hashtable dataHash = new Hashtable();
//			Hashtable regInfoHash = new Hashtable(); 
//			this.checkRegInfo(regInfoHash);
//			dataHash.put("register", regInfoHash);
//		}
//	}

	public void checkRegInfo(Hashtable hash) {
		hash.put("deviceReg", "" + m_regCount );
		hash.put("deviceUnreg", "" + m_unregCount);
		hash.put("deviceDeactive", "" + m_deactiveCount);
	}
	
	public void checkRegInfo0(Hashtable hash) {
		Iterator it = this.devices.values().iterator();
		int unregCount = 0;
		int regCount = 0;
		int deactiveCount = 0;
		while (it.hasNext()) {
			Device device = (Device) it.next();
			if (device.getActived()) {
				if (device.getLocate() == null) {
					unregCount++;
				} else {
					regCount++;
				}
			} else {
				deactiveCount++;
			}
		}
//		System.err.println(m_regCount + "  " + regCount);
//		System.err.println(m_unregCount + "  " + unregCount);
//		System.err.println(m_deactiveCount + "  " + deactiveCount);
		hash.put("deviceNum", "" + (regCount + unregCount));
		hash.put("deviceUnregNum", "" + unregCount);
		hash.put("deviceDeactiveNum", "" + deactiveCount);
	}
	
}
