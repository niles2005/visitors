package com.inesazt.visitors;
import java.util.Hashtable;
import java.util.Map;


public class Roles {

    private Map<String,Role> roles = new Hashtable<String,Role>(); 
    
    public Map<String,Role> getRows() { return roles; }
    public void setRows(Map<String,Role> roles) { this.roles = roles; }

    public void addRole(Role role) {
    	roles.put(role.getId(), role);
    }
    
    public Role getRole(String id) {
    	return roles.get(id);
    }

    
 
}
