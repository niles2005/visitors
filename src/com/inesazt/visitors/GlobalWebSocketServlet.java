package com.inesazt.visitors;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

@WebServlet("/ws")
public class GlobalWebSocketServlet extends WebSocketServlet {
	@Override
	protected StreamInbound createWebSocketInbound(String subProtocol,
			HttpServletRequest request) {
		
		return Global.getInstance().createWebSocketInbound(subProtocol, request);
	}

}