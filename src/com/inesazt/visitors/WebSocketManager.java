package com.inesazt.visitors;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Set;
import java.util.TimerTask;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WsOutbound;

public class WebSocketManager {
	private static WebSocketManager m_instance = null;

	public static WebSocketManager getInstance() {
		if(m_instance == null) {
			m_instance = new WebSocketManager();
		}
		return m_instance;
	}
	
	private java.util.Timer timer = null; 
	private WebSocketManager() {
		timer = new java.util.Timer(true); 
		timer.schedule(new MyTask(), 0, MyTask.LoopTime);
	}
	
	 class MyTask extends TimerTask {
			private boolean isRunning = false;
			public static final long LoopTime = 5 * 1000;//5 second

			public MyTask() {
			}

			public void run() {
				if (!isRunning) {
					isRunning = true;

					doLoopWork();
					
					isRunning = false;
				}
			}
			
			private void doLoopWork() {
				String cardsInfo = Global.getInstance().getCards().doList();
				for (ChatMessageInbound connection : connections) {
					try {
						CharBuffer buffer = CharBuffer.wrap(cardsInfo);
						connection.getWsOutbound().writeTextMessage(buffer);
					} catch (IOException ignore) {
						// Ignore
					}
				}
			}
		}

	
	public void close() {
		timer.cancel(); 
	}
	
	
	
	private static int index = 0;
	private static final String GUEST_PREFIX = "Guest";

	private final AtomicInteger connectionIds = new AtomicInteger(0);
	private final Set<ChatMessageInbound> connections = new CopyOnWriteArraySet<ChatMessageInbound>();
	
	public StreamInbound createWebSocketInbound(String subProtocol,
			HttpServletRequest request) {
		return new ChatMessageInbound(connectionIds.incrementAndGet());
	}

	public final class ChatMessageInbound extends MessageInbound {
		private final String nickname;

		private ChatMessageInbound(int id) {
			this.nickname = GUEST_PREFIX + id;
		}

		@Override
		protected void onOpen(WsOutbound outbound) {
			connections.add(this);
			System.err.println("aaaaaaaaaaaaaaaaaaaa " + connections.size());
		}

		@Override
		protected void onClose(int status) {
			connections.remove(this);
			System.err.println("cccccccccccccccccc " + connections.size());
		}

		@Override
		protected void onBinaryMessage(ByteBuffer message) throws IOException {
			throw new UnsupportedOperationException(
					"Binary message not supported.");
		}

		@Override
		protected void onTextMessage(CharBuffer message) throws IOException {
			// Never trust the client
			String filteredMessage = String.format("%s: %s", nickname,
					message.toString());
//			broadcast(filteredMessage);
		}

//		private void broadcast(String message) {
//			for (ChatMessageInbound connection : connections) {
//				try {
//					CharBuffer buffer = CharBuffer.wrap(message);
//					connection.getWsOutbound().writeTextMessage(buffer);
//				} catch (IOException ignore) {
//					// Ignore
//				}
//			}
//		}

	}

}
