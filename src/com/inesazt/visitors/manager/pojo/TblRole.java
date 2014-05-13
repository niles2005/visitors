package com.inesazt.visitors.manager.pojo;

/**
 * 权限表
 * @author xyc
 *
 */
public class TblRole {

	private Integer id;
	
	private String name;
	
	private String areas;
	
	private String icon;
	
	private String color;
	
	private Integer status;
	
	private Integer roleType;
	
	public static final Integer ABLE = 1;
	
	public static final Integer DISABLE = 0;
	
	public static final Integer GUEST_TYPE = 0;
	
	public static final Integer FACILITY_TYPE = 1;

	public TblRole(){
		
	}

	

	public TblRole(String name, String areas, String icon,
			String color, Integer status, Integer roleType) {
		this.name = name;
		this.areas = areas;
		this.icon = icon;
		this.color = color;
		this.status = status;
		this.roleType = roleType;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAreas() {
		return areas;
	}

	public void setAreas(String areas) {
		this.areas = areas;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public static Integer getAble() {
		return ABLE;
	}

	public static Integer getDisable() {
		return DISABLE;
	}

	public Integer getRoleType() {
		return roleType;
	}

	public void setRoleType(Integer roleType) {
		this.roleType = roleType;
	}
	
}
