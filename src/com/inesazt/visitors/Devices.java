package com.inesazt.visitors;

import java.util.Hashtable;
import java.util.Map;


public class Devices {

    private Map<String,Device> devices = new Hashtable<String,Device>(); 
    
    public Map<String,Device> getRows() { return devices; }
    public void setRows(Map<String,Device> devices) { this.devices = devices; }

    public void addDevice(Device device) {
    	devices.put(device.getId(), device);
    }
    
    public Device getDevice(String deviceId) {
    	return devices.get(deviceId);
    }
 
}
