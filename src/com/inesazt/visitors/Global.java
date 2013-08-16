package com.inesazt.visitors;


import java.io.IOException;
import java.nio.CharBuffer;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import com.alibaba.fastjson.JSON;



public class Global {
	private String m_strToday = null;
	
	private static Global m_instance= null;
	
	public static Global getInstance() {
		return m_instance;
	}
	
	public static void initInstance() {
		if(m_instance == null) {
			m_instance = new Global();
		}
	}
	
	private Global() {
		initGlobal();
	}

	private Devices m_devices = null;
	
	private Cards m_cards = null;
	
	private Feedbacks m_feedbacks = null;
	
	private Events m_events = null;
	
	private boolean m_init = false;
	private void initGlobal() {
		try {
			if(m_init) {
				return;
			}
			m_init = true;
			m_strToday = DateTimeUtil.getTodayString();
			
			m_devices = new Devices();
			m_cards = new Cards();
			m_feedbacks = Feedbacks.buildFeedback();

			//为了保证查询后的卡，都有具体的位置，倒数7天查询events
			String back7Day = DateTimeUtil.getDayString(new Date().getTime(),-7);
			m_events = new Events(m_cards,m_devices,back7Day);
			System.err.println("Global init finished.");
			
//			Reader reader = new BufferedReader(new InputStreamReader(new FileInputStream(ServerConfig.getInstance().getMybatisConfigureFile()),"UTF-8"));
//			SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
//			
//	        SqlSession session = sqlSessionFactory.openSession();
//	        try {
//	            IUserOperation userOperation=session.getMapper(IUserOperation.class);           
//	            List<User> users = userOperation.selectUsers("%");
//	            for(User user:users){
//	                System.out.println(user.getId()+":"+user.getUserName()+":"+user.getUserAddress());
//	            }
//	            
//	        } finally {
//	            session.close();
//	        }
			
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public String getToday() {
		return this.m_strToday;
	}

	public boolean isToday(String date) {
		return m_strToday.equals(date);
	}

	public Cards getCards() {
		return m_cards;
	}

	public Card getCard(String cardId) {
		return m_cards.getCard(cardId);
	}

	public Devices getDevices() {
		return m_devices;
	}
	
	public Feedbacks getFeedbacks(){
		return m_feedbacks;
	}

	public Events getEvents() {
		return m_events;
	}
	
	private final Set<ChatMessageInbound> m_connections = new CopyOnWriteArraySet<ChatMessageInbound>();
	
	public void addChatMessageInbound(ChatMessageInbound cmi) {
		m_connections.add(cmi);
	}
	
	public void removeChatMessageInbound(ChatMessageInbound cmi) {
		m_connections.remove(cmi);
	}
	
	//for client init
	public String getInitDatas() {
		Hashtable hash = new Hashtable();
		
		Hashtable regInfoHash = new Hashtable(); 
		m_cards.checkRegInfo(regInfoHash);
		m_devices.checkRegInfo(regInfoHash);
		
		if(regInfoHash.size() > 0) {
			hash.put("register", regInfoHash);
		}
		
		hash.put("today", m_strToday);
		
		hash.put("cards", m_cards.getGroup());
		
		String str = JSON.toJSONString(hash);
//		System.err.println(str);
		return str;
	}
	
	public void doTaskWork() {
		String today = DateTimeUtil.getTodayString();
		if(today != null && !today.equals(m_strToday)) {
			m_strToday = today;
			
			m_cards.changeDate();
			
			Hashtable hash = new Hashtable();
			hash.put("today", m_strToday);
			broadcastClientData(hash);
		}
		if(m_events != null) {
			m_events.doTaskWork();
		}
	}
	
//	public void broadcastClientData(String jsonData) {
//		if(jsonData != null) {
//			for (ChatMessageInbound connection : m_connections) {
//				try {
//					CharBuffer buffer = CharBuffer.wrap(jsonData);
//					connection.getWsOutbound().writeTextMessage(buffer);
//				} catch (IOException ex) {
//					ex.printStackTrace();
//				}
//			}
//		}
//	}

	public void broadcastClientData(List list) {
		if(list != null) {
			String jsonData = JSON.toJSONString(list);
			for (ChatMessageInbound connection : m_connections) {
				try {
					CharBuffer buffer = CharBuffer.wrap(jsonData);
					connection.getWsOutbound().writeTextMessage(buffer);
				} catch (IOException ex) {
					ex.printStackTrace();
				}
			}
		}
	}

	public void broadcastClientData(Map map) {
		if(map != null) {
			String jsonData = JSON.toJSONString(map);
			for (ChatMessageInbound connection : m_connections) {
				try {
					CharBuffer buffer = CharBuffer.wrap(jsonData);
					connection.getWsOutbound().writeTextMessage(buffer);
				} catch (IOException ex) {
					ex.printStackTrace();
				}
			}
		}
	}

	private Hashtable m_beepInfoHash = new Hashtable();
	private long m_beepIndex = 0;
	public void broadcastBeepInfo() {
		m_beepInfoHash.put("beeptime", new Date().getTime());
		m_beepIndex += 1;
		m_beepInfoHash.put("beepindex", m_beepIndex);
		this.broadcastClientData(m_beepInfoHash);
	}
}
