package com.inesazt.visitors;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Map;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;

public class DeviceGroup {
	private static ObjectMapper fileData_mapper = new ObjectMapper();
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
				changeRegisterInfo(0,1,0);
			} else {
				changeRegisterInfo(1,0,0);
			}
		} else {
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
				DeviceGroup deviceGroup = fileData_mapper.readValue(deviceFile, DeviceGroup.class);
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
			FileOutputStream fos = new FileOutputStream(deviceFile);
			JsonGenerator jsonGenerator = fileData_mapper.getJsonFactory()
					.createJsonGenerator(fos, JsonEncoding.UTF8);
			jsonGenerator.writeObject(this);
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
		
		this.boardCastRegisterInfo();
//		System.err.println("changed device:" + m_regCount + "   " + m_unregCount +  "   " + m_deactiveCount);
	}
	
	private void boardCastRegisterInfo() {
		if(Global.getInstance() != null) {
			Hashtable dataHash = new Hashtable();
			Hashtable regInfoHash = new Hashtable(); 
			this.checkRegInfo(regInfoHash);
			dataHash.put("register", regInfoHash);
			String str = JSON.toJSONString(dataHash);
			Global.getInstance().broadcastClientData(str);
		}
	}

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
