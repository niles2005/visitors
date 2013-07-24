package com.inesazt.visitors;

import com.alibaba.fastjson.JSON;

public class RolesTest {

	public static void main(String[] args) {
		Roles roles = new Roles();
		
		for(int i=0;i<DataEnums.RoleNames.length;i++) {
			String roleName = DataEnums.RoleNames[i];
			String roleLabel = DataEnums.RoleLabels[i];
			for(int j=0;j<DataEnums.Locates.length;j++) {
				Role role = new Role();
				int roleLat = Roles.rolePoses[j * 2];
				int roleLon = Roles.rolePoses[j * 2 + 1];
				
				String locate = DataEnums.Locates[j];
				role.setId(roleName.substring(0,1) + "_" + locate);
				role.setLocate(DataEnums.Locates[j]);
				role.setName(roleName);
				role.setLabel(roleLabel);
				role.setCount(0);
				
				role.setPos(new Pos(roleLat,roleLon + Roles.roleOffsetLon * i));
				
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
		String str = JSON.toJSONString(roles);
		System.err.println(str);
		
	}

}
