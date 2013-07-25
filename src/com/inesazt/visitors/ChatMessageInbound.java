package com.inesazt.visitors;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

public class ChatMessageInbound extends MessageInbound {
	public ChatMessageInbound() {
	}

	@Override
	protected void onOpen(WsOutbound outbound) {
		Global.getInstance().addChatMessageInbound(this);
	}

	@Override
	protected void onClose(int status) {
		Global.getInstance().removeChatMessageInbound(this);
	}

	@Override
	protected void onBinaryMessage(ByteBuffer message) throws IOException {
		throw new UnsupportedOperationException("Binary message not supported.");
	}

	@Override
	protected void onTextMessage(CharBuffer message) throws IOException {
	}

}

