package com.inesazt.visitors;

public class Device {
	private String id = null;
	private String locate = null;
	private String info = null;
	private long createTime = 0;
	private boolean isActived = true;

	private DeviceGroup m_deviceGroup = null;
	public void settheDeviceGroup(DeviceGroup deviceGroup) {
		m_deviceGroup = deviceGroup;
	}
	
	public boolean getActived() {
		return isActived;
	}

	public void setActived(boolean isActived) {
		if(m_deviceGroup != null) {
//			System.err.println("set active:" + isActived);
			if(this.isActived != isActived) {//int regNum,int unregNum,int deactiveNum
				if(isActived) {
					if(locate != null) {
						this.m_deviceGroup.changeRegisterInfo(1, 0, -1);
					} else {
						this.m_deviceGroup.changeRegisterInfo(0, 1, -1);
					}
				} else {
					if(locate != null) {
						this.m_deviceGroup.changeRegisterInfo(-1, 0, 1);
					} else {
						this.m_deviceGroup.changeRegisterInfo(0, -1, 1);
					}
				}
			}
		}
		this.isActived = isActived;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLocate() {
		return locate;
	}

	public void setLocate(String locate) {
		if(m_deviceGroup != null) {
//			System.err.println("set role:" + role);
			if(this.isActived) {
				boolean hasOldRole = this.locate != null;
				boolean hasNewRole = locate != null;
				if(hasOldRole != hasNewRole) {//int regNum,int unregNum,int deactiveNum
					if(locate != null) {
						this.m_deviceGroup.changeRegisterInfo(1, -1, 0);
					} else {
						this.m_deviceGroup.changeRegisterInfo(-1, 1, 0);
					}
				}
			}
		}
		this.locate = locate;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
		this.createTime = createTime;
	}
}
