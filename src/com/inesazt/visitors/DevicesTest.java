package com.inesazt.visitors;

import com.alibaba.fastjson.JSON;

public class DevicesTest {
	public DevicesTest() {
		Devices devices = new Devices();
		
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
		
		String str = JSON.toJSONString(devices);
		System.err.println(str);
	}

	public static void main(String[] args) {
		new DevicesTest();
	}

}
