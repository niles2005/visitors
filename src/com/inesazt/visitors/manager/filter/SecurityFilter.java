/*
 * Copyright 2004 The Apache Software Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.inesazt.visitors.manager.filter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 权限的Filter
 * 仅有登录后，才可访问/*?action的资源
 * @author win-7
 *
 */
public class SecurityFilter implements Filter {

	private Map<String,String[]> authorityMap; 
	
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest rq = (HttpServletRequest)request;
		String uri = rq.getRequestURI();
//		System.out.println(uri);
		if(uri.indexOf("login.html") != -1){
			chain.doFilter(request, response);
		}else{
			HttpServletResponse rp = (HttpServletResponse)response;
			Object username = rq.getSession().getAttribute("username");
			String authority = (String)rq.getSession().getAttribute("authority");
			if(username == null){
				rp.sendRedirect(rq.getContextPath() + "/login.html");
				return;
			}
			boolean authorize = authorize(uri, authority);
			if(authorize){
				chain.doFilter(request, response);		
			}else{
				rp.sendRedirect(rq.getContextPath() + "/forbid.html");
			}
		}
	}

	@Override
	public void destroy() {
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
		//初始化权限map
		initAuthorityMap();
	}
	
	//此权限map代表的是无法访问的资源项
	private void initAuthorityMap() {
		
		authorityMap = new HashMap<String,String[]>();
		authorityMap.put("admin", null);
		authorityMap.put("operator", new String[]{"role.html", "card.html", "device.html"});
		authorityMap.put("other", new String[]{"cardbind.html", "facilitybind.html", "cardmg.html",  "role.html", "card.html", "device.html"});
		
	}
	
	private boolean authorize(String uri, String authority) {
		
		if(uri != null){
			String[] resources = authorityMap.get(authority);
			if(resources != null){
				for(String resource : resources){
					if(uri.indexOf(resource) != -1){//uri中含有authorityMap中定义的资源项
						return false;
					}
				}
			}
		}
		return true;
	}
	
}
