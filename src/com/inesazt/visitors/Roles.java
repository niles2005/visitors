package com.inesazt.visitors;
import java.io.File;
import java.util.Hashtable;
import java.util.Map;

import com.alibaba.fastjson.JSON;


public class Roles {
	private static int[] rolePoses = new int[]{
			312717660,1218221390,
			312717660,1218280620,
			312678600,1218279970,
			312655300,1218294350,
	};
	private static int roleOffsetLon = 10000;
	
    private Map<String,Role> roles = new Hashtable<String,Role>(); 
    
    public Map<String,Role> getGroup() { return roles; }
    public void setGroup(Map<String,Role> roles) { this.roles = roles; }

    public void addRole(Role role) {
    	roles.put(role.getId(), role);
    }
    
    public Role getRole(String id) {
    	return roles.get(id);
    }

    
	public static Roles buildRoles() {
		Roles roles = new Roles();
		
		for(int i=0;i<DataEnums.RoleNames.length;i++) {
			String roleName = DataEnums.RoleNames[i];
			String roleLabel = DataEnums.RoleLabels[i];
			for(int j=0;j<DataEnums.Locates.length;j++) {
				Role role = new Role();
				int roleLat = rolePoses[j * 2];
				int roleLon = rolePoses[j * 2 + 1];
				
				String locate = DataEnums.Locates[j];
				role.setId(roleName.substring(0,1) + "_" + locate);
				role.setLocate(DataEnums.Locates[j]);
				role.setName(roleName);
				role.setLabel(roleLabel);
				role.setCount(0);
				
				role.setPos(new Pos(roleLat,roleLon + roleOffsetLon * i));
				
				if(i == 0 && j == 1) {
					role.setWarn(true);
				} else if(i == 1 && j == 0) {
					role.setWarn(true);
				} else if(i == 2 && (j == 0 || j == 1)) {
					role.setWarn(true);
				}
				roles.addRole(role);
			}
		}
		
		return roles;
	}

	public String doList() {
		String str = JSON.toJSONString(this);
//		System.err.println(str);
		return str;
	}
	
}
