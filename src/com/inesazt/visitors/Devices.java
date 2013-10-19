package com.inesazt.visitors;

import java.util.Date;
import java.util.Hashtable;
import java.util.Map;

import com.alibaba.fastjson.JSON;


public class Devices {
	private DeviceGroup m_deviceGroup = null;

	public Devices() {
		m_deviceGroup = DeviceGroup.doLoad();
		if(m_deviceGroup == null) {
			m_deviceGroup = new DeviceGroup();
		}
	}
	
	public boolean saveDevices() {
		return this.m_deviceGroup.doSave();
	}
    
	public Map<String, Device> getGroup() {
		return this.m_deviceGroup.getGroup();
	}

	public void addDevice(Device device) {
		m_deviceGroup.addDevice(device);
	}
	
	public Device getDevice(String deviceId) {
		return m_deviceGroup.getDevice(deviceId);
	}
	
    public Device buildDevice(String deviceId) {
    	if(deviceId == null) {
    		return null;
    	}
    	Device device = m_deviceGroup.getDevice(deviceId);
    	if(device == null) {
    		device = new Device();
//    		System.out.println("=========new Device() "+deviceId);
    		device.setId(deviceId);
    		addDevice(device);
    	}
    	return device;
    }
    
	public String doList() {
		String str = JSON.toJSONString(m_deviceGroup);
//		System.err.println(str);
		return str;
	}
	
	public String setDevice(String id,String locate,String info,boolean actived) {
		if(id == null) {
			return WebUtil.error("device id is null!");
		}
		id = id.trim();
		if(id.length() == 0) {
			return WebUtil.error("device id is empty!");
		}
		Device device = getDevice(id);
		if(device == null) {
			device = new Device();
			device.setId(id);
			if(locate != null) {
				device.setLocate(locate);
			}
			if(info != null) {
				device.setInfo(info);
			}
			device.setActived(actived);
			device.setCreateTime(new Date().getTime());
			this.addDevice(device);
		} else {
			if(locate != null) {
				device.setLocate(locate);
			}
			if(info != null) {
				device.setInfo(info);
			}
			device.setActived(actived);
		}
		boolean success = saveDevices();
		if(success) {
			return JSON.toJSONString(device);
		} else {
			return WebUtil.failedJSON("update device error!");
		}
	}
	
	public void checkRegInfo(Hashtable hash) {
		this.m_deviceGroup.checkRegInfo(hash);
	}
	
}
