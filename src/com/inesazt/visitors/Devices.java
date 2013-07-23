package com.inesazt.visitors;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.Hashtable;
import java.util.Map;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;


public class Devices {
	private static ObjectMapper fileData_mapper= new ObjectMapper();
	
    private Map<String,Device> devices = new Hashtable<String,Device>(); 
    
    public Map<String,Device> getGroup() { return devices; }
    public void setGroup(Map<String,Device> devices) { this.devices = devices; }

    public void addDevice(Device device) {
    	devices.put(device.getId(), device);
    }
    
    public Device getDevice(String deviceId) {
    	return devices.get(deviceId);
    }
    
    public Device buildDevice(String deviceId) {
    	if(deviceId == null) {
    		return null;
    	}
    	Device device = devices.get(deviceId);
    	if(device == null) {
    		device = new Device();
    		device.setId(deviceId);
    		addDevice(device);
    	}
    	return device;
    }
    
	public static Devices buildDevices() {
		File deviceFile = ServerConfig.getInstance().getDeviceFile();
		Devices devices = null;
		try {
			if(deviceFile.exists()) {
				devices = fileData_mapper.readValue(deviceFile, Devices.class);
			} else {
				devices = new Devices();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return devices;
	}
    
	public synchronized boolean saveDevices() {
		try {
			File deviceFile = ServerConfig.getInstance().getDeviceFile();
			FileOutputStream fos = new FileOutputStream(deviceFile);
			JsonGenerator jsonGenerator = fileData_mapper.getJsonFactory().createJsonGenerator(fos, JsonEncoding.UTF8);
			jsonGenerator.writeObject(this);
			return true;
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		return false;
	}
	
	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
	public String setDevice(String id,String locate,String info) {
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
			device.setCreateTime(new Date().getTime());
			this.addDevice(device);
		} else {
			if(locate != null) {
				device.setLocate(locate);
			}
			if(info != null) {
				device.setInfo(info);
			}
		}
		boolean success = saveDevices();
		if(success) {
			return JSON.toJSONString(device);
		} else {
			return WebUtil.failedJSON("update device error!");
		}
	}
	
	
	
}
