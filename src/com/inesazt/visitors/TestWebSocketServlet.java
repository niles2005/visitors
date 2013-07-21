package com.inesazt.visitors;


import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Date;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;

import com.alibaba.fastjson.JSON;


/**
 * Example web socket servlet for chat.
 */
public class TestWebSocketServlet extends WebSocketServlet {

    private static final long serialVersionUID = 1L;

    private static final String GUEST_PREFIX = "Guest";
    private Random rand = new Random();
    private String[] autoritys = new String[]{"worker","staff","guard","admin"};
	private String[] genders = new String[]{"mail","femail"};
	private int baseLat = 312605060;
	private int baseLon = 1218334470;
	private int offsetLat = -2500;
	private int offsetLon = 8000;

    private final AtomicInteger connectionIds = new AtomicInteger(0);
    private final Set<ChatMessageInbound> connections =
            new CopyOnWriteArraySet<ChatMessageInbound>();

    @Override
    protected StreamInbound createWebSocketInbound(String subProtocol,
            HttpServletRequest request) {
        return new ChatMessageInbound(connectionIds.incrementAndGet());
    }

    private final class ChatMessageInbound extends MessageInbound {

        private final String nickname;

        private ChatMessageInbound(int id) {
            this.nickname = GUEST_PREFIX + id;
        }

        @Override
        protected void onOpen(WsOutbound outbound) {
            connections.add(this);
            String message = String.format("* %s %s",
                    nickname, "has joined.");
            try {
				while (true) {
					broadcast(listVisitors());
					Thread.sleep(5000);
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
        }

        @Override
        protected void onClose(int status) {
            connections.remove(this);
            String message = String.format("* %s %s",
                    nickname, "has disconnected.");
            broadcast(message);
        }

        @Override
        protected void onBinaryMessage(ByteBuffer message) throws IOException {
            throw new UnsupportedOperationException(
                    "Binary message not supported.");
        }

        @Override
        protected void onTextMessage(CharBuffer message) throws IOException {
            // Never trust the client
            String filteredMessage = String.format("%s: %s",
                    nickname, message.toString());
            broadcast(filteredMessage);
        }

        private void broadcast(String message) {
            for (ChatMessageInbound connection : connections) {
                try {
                    CharBuffer buffer = CharBuffer.wrap(message);
                    connection.getWsOutbound().writeTextMessage(buffer);
                } catch (IOException ignore) {
                    // Ignore
                }
            }
        }
        
        private String listVisitors() {
    		Visitors visitors = new Visitors();
    		
    		for(int i=0;i<2;i++) {
    			Visitor visitor = new Visitor();
    			int r = rand.nextInt(100);
    			String theAutority = autoritys[r % 4];
    			
    			visitor.setId(theAutority.substring(0,1) + i);
    			visitor.setName(theAutority + i);
    			
    			visitor.setGender(genders[r % 2]);
    			visitor.setAge(rand.nextInt(30) + 20);
    			visitor.setAuthority(theAutority);
    			visitor.setCreateTime(new Date().getTime());
    			visitor.setInfo("Test role for " + theAutority);
    			
    			visitor.setType("road");
    		
    			int lat = baseLat + offsetLat * (r / 5);
    			int lon = baseLon + offsetLon * (r % 5);
    			visitor.setPos(new Pos(lat,lon));
    			visitors.addVisitor(visitor);
    		}
    		
    		String str = JSON.toJSONString(visitors);
    		
    		return str;
    	}
    }
}