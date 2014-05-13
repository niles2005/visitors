package com.inesazt.visitors;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.alibaba.fastjson.JSON;
import com.inesazt.visitors.manager.bo.ManagerBoImpl;
import com.inesazt.visitors.manager.dao.ManagerDaoImpl;
import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblFacilityInfo;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;
import com.inesazt.visitors.manager.pojo.TblRole;



public class Global {
	private String m_strToday = null;
	private static Global m_instance= null;
	private String DBType;
	private SqlSessionFactory m_sqlSessionFactory ;
	
	public static Global getInstance() {
		return m_instance;
	}
	
	public static void initInstance() {
		if(m_instance == null) {
			m_instance = new Global();
			m_instance.initGlobal();
		}
	}
	
	private Global() {
		
	}

	private Devices m_devices = null;
	
	private Cards m_cards = null;
	
	private Feedbacks m_feedbacks = null;
	
	private Events m_events = null;
	
	private List<TblRole> m_roleList = new ArrayList<TblRole>();
	
	private Map<Integer , TblRole> m_roleMap = new HashMap<Integer , TblRole>();
	
	private ManagerDaoImpl m_managerDao = new ManagerDaoImpl();
	
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
			
			
			try {
				Reader reader = new BufferedReader(new InputStreamReader(
						new FileInputStream(ServerConfig.getInstance()
								.getMybatisConfigureFile()), "UTF-8"));
				m_sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);

				Environment environment = m_sqlSessionFactory.getConfiguration()
						.getEnvironment();
				DataSource dataSource = environment.getDataSource();
				// org.sqlite.MetaData@1028607
				// oracle.jdbc.driver.OracleDatabaseMetaData@1fb9d58
				String metaDataClass = dataSource.getConnection().getMetaData()
						.toString().toLowerCase();
				if (metaDataClass.indexOf("oracle") != -1) {
					DBType = "oracle";
				} else if (metaDataClass.indexOf("sqlite") != -1) {
					DBType = "sqlite";
				} else if (metaDataClass.indexOf("sqlserver") != -1) {
					DBType = "sqlserver";
				} else {
					throw new RuntimeException("DBType is not find!");
				}
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			
			//为了保证查询后的卡，都有具体的位置，倒数7天查询events
			String back7Day = DateTimeUtil.getDayString(new Date().getTime(),-7);
			m_events = new Events(m_cards,m_devices,back7Day);
			System.err.println("Global init finished***************");
			this.changeRegister();
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public List<TblRole> getRoles() {
		m_roleList = m_managerDao.getRoleList(null);
		m_roleMap.clear();
		for(TblRole role : m_roleList){
			m_roleMap.put(role.getId(), role);
		}
		return m_roleList;
	}
	
	private TblRole getRoleById(Integer roleId){
		return m_roleMap.get(roleId);
	}
	
	public String setRole(Integer roleId , TblRole tblRole){
		String roleName = tblRole.getName();
		if( roleName == null || roleName.equals("")){
			return WebUtil.error("role's name can not be null");
		}
		TblRole oldTblRole = getRoleById(roleId);
		if( oldTblRole == null){
			return insertRole(tblRole);
		}else{
			tblRole.setId(roleId);
			return updateRole(tblRole , oldTblRole.getName());
		}
	}
	
	private String insertRole(TblRole tblRole) {
		if(m_managerDao.insertTblRole(tblRole)) {
			m_roleUpdateTimes++;
			return WebUtil.oKJSON();
		}else{
			return WebUtil.error("insert role failse");
		}
	}
	
	private int m_roleUpdateTimes = 0;
	private String updateRole(TblRole tblRole , String oldRoleName) {
		if(m_managerDao.updateTblRole(tblRole ,oldRoleName )) {
			m_cards.updatedCardGroup();
			m_roleUpdateTimes++;
			return WebUtil.oKJSON();
		}else{
			return WebUtil.error("update role failse");
		}
	}
	
	public void updateCardsStatus(){
		if (m_cards != null) {
			m_cards.updatedCardGroup();
			m_guestUpdateTimes++;
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
	
	
	public String getDBType() {
		return DBType;
	}

	public SqlSessionFactory getSqlSessionFactory() {
		return m_sqlSessionFactory;
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
//			if(m_events != null) {
//				m_events.generateGoOutEvents();
//			}
			
			m_strToday = today;			
			m_cards.changeDate();			
			Hashtable hash = new Hashtable();
			hash.put("today", m_strToday);
		}
		if(m_events != null) {
			m_events.doTaskWork();
		}
	}
	
	public void updateCard(Card card , TblCard tblCard){
		if( card != null && tblCard != null) {
			card.setTblCard(tblCard);
		}
		String cardNo = card.getName();
		ManagerBoImpl managerBo = new ManagerBoImpl();
		if(card.getOwnerType() != null){
			if (card.getOwnerType() == 1) {//访客
				List<TblGuestInfo> guestInfoList = managerBo.getGuestInfoByCard(cardNo);
				if (guestInfoList != null && guestInfoList.size() == 1) {
					card.setGuest(guestInfoList.get(0));
					card.setFacility(null);
				}				
			}
			if (card.getOwnerType() == 2) {//厂务
				List<TblFacilityInfo> facilityList = managerBo.getFacilityInfoByCard(cardNo);
				if (facilityList != null && facilityList.size() == 1) {
					card.setFacility(facilityList.get(0));
					card.setGuest(null);
				}				
			}
			if (card.getOwnerType() == 0) {//什么都不是
				card.setGuest(null);
				card.setFacility(null);
			}
		}else{
			card.setGuest(null);
			card.setFacility(null);
		}
		
	}
	
	private int m_registerIndex = 0;
	
	public void changeRegister() {
		m_registerIndex++;
	}
	
	private int m_guestUpdateTimes = 0;
	public void addGuestUpdateTime(){
		m_guestUpdateTimes++;
	}
	
	public synchronized String doClientUpdate(int eventIndex,int registerIndex,int guestUpdateTimes,int roleUpdateTimes,String date) {
		Hashtable dataHash = new Hashtable();
		
		if(!m_strToday.equals(date)) {
			dataHash.put("today", m_strToday);
		}
		int lastSeqId = this.m_events.getLastSeqId();
		if(m_registerIndex != registerIndex) {
			//send register
			Hashtable regInfoHash = new Hashtable(); 
			m_cards.checkRegInfo(regInfoHash);
			m_devices.checkRegInfo(regInfoHash);
			if(regInfoHash.size() > 0) {
				dataHash.put("register", regInfoHash);
			}
			dataHash.put("regIndex", m_registerIndex);
		}
		if( m_roleUpdateTimes != roleUpdateTimes ) {
			dataHash.put("roleUpdateTimes", m_roleUpdateTimes);
		}
		
		if (eventIndex == -999) {//init
//			this.updateCardsStatus();
			dataHash.put("cards", m_cards.getFilterGroup(2)); // 过滤出已经绑定到人的卡
		} else { 
			if(lastSeqId == eventIndex) {
				
			} else {
				List<Event> eventList = m_events.getTodayEventList();
				int recordPos = eventList.size() - (lastSeqId - eventIndex);
				if(recordPos < 0) {
					recordPos = 0;
				}
				if( recordPos < eventList.size()) {
					List newEventList = eventList.subList(recordPos,eventList.size());
					if (newEventList.size() > 0) {
						dataHash.put("events", newEventList);
						dataHash.put("cards",  m_cards.getFilterGroup(2));// 过滤出已经绑定到人的卡
					}
				}
			}
			if( guestUpdateTimes != m_guestUpdateTimes){
				dataHash.put("cards", m_cards.getFilterGroup(2)); // 过滤出已经绑定到人的卡
				dataHash.put("guestUpdateTimes", m_guestUpdateTimes);
			}
		}
		dataHash.put("fromIndex", lastSeqId);
		
		return JSON.toJSONString(dataHash);		
	}
}
