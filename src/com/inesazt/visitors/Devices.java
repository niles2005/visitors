package com.inesazt.visitors;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Hashtable;
import java.util.Map;

import org.codehaus.jackson.JsonEncoding;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;


public class Devices {
	private static ObjectMapper fileData_mapper= new ObjectMapper();
	
    private Map<String,Device> devices = new Hashtable<String,Device>(); 
    
    public Map<String,Device> getRows() { return devices; }
    public void setRows(Map<String,Device> devices) { this.devices = devices; }

    public void addDevice(Device device) {
    	devices.put(device.getId(), device);
    }
    
    public Device getDevice(String deviceId) {
    	return devices.get(deviceId);
    }
    
	public static Devices buildDevices() {
		File deviceFile = ServerConfig.getInstance().getDeviceFile();
		Devices devices = null;
		try {
			if(deviceFile.exists()) {
				devices = new Devices();
			} else {
				devices = fileData_mapper.readValue(deviceFile, Devices.class);
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
		Device device = getDevice(id);
		if(device == null) {
			return WebUtil.error("Can not find device:" + id);
		}
		if(locate != null) {
			device.setLocate(locate);
		}
		if(info != null) {
			device.setInfo(info);
		}
		String str = JSON.toJSONString(device);
		return str;
	}
	
	
	
}
