package com.inesazt.visitors.manager.bo;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.Attributes;
import javax.naming.directory.InitialDirContext;

public class LoginBoImpl {

	/**
	 * 读取域中信息
	 * @param username
	 * @param password
	 * @param addr
	 * @throws Exception
	 */
	public static boolean userAuthenticate(String username,String password,String addr) {
		try{
			Hashtable env = new Hashtable();
			env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL, addr);
			env.put(Context.SECURITY_AUTHENTICATION, "simple");
			env.put(Context.SECURITY_PRINCIPAL, username+"@sdcorp.global.sandisk.com");
			env.put(Context.SECURITY_CREDENTIALS,password);
			InitialDirContext ctx = new InitialDirContext(env);
			Attributes attrs = ctx.getAttributes("");
			NamingEnumeration enm = attrs.getAll();
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
