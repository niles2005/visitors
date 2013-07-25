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
	public WebSocketManager() {
	}
	
//	public void doTaskWork() {
//		String cardsInfo = Global.getInstance().getCards().doList();
//		for (ChatMessageInbound connection : connections) {
//			try {
//				CharBuffer buffer = CharBuffer.wrap(cardsInfo);
//				connection.getWsOutbound().writeTextMessage(buffer);
//			} catch (IOException ignore) {
//				// Ignore
//			}
//		}
//	}
//	
//	private final Set<ChatMessageInbound> connections = new CopyOnWriteArraySet<ChatMessageInbound>();
//	
//	public StreamInbound createWebSocketInbound(String subProtocol,
//			HttpServletRequest request) {
//		return new ChatMessageInbound();
//	}
//
////	public final class ChatMessageInbound extends MessageInbound {
////		private ChatMessageInbound() {
////		}
////
////		@Override
////		protected void onOpen(WsOutbound outbound) {
////			connections.add(this);
////			System.err.println("aaaaaaaaaaaaaaaaaaaa " + connections.size());
////		}
////
////		@Override
////		protected void onClose(int status) {
////			connections.remove(this);
////			System.err.println("cccccccccccccccccc " + connections.size());
////		}
////
////		@Override
////		protected void onBinaryMessage(ByteBuffer message) throws IOException {
////			throw new UnsupportedOperationException(
////					"Binary message not supported.");
////		}
////
////		@Override
////		protected void onTextMessage(CharBuffer message) throws IOException {
////		}
////
////	}

}
