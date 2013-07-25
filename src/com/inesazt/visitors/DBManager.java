package com.inesazt.visitors;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class DBManager {
    private static DBManager m_instance = null;
    
    public static DBManager getInstance() {
    	return m_instance;
    }
    
    public static void initInstance(Configure configure) {
    	if(m_instance == null) {
    		m_instance = new DBManager(configure);
    	}
    }
    
    private Configure m_configure = null;
    private DBManager(Configure configure) {
    	m_configure = configure;
	}
    
    private Connection m_connection = null;
    private Connection getConnection() {
		Connection conn = null;
		try {
			Class.forName(m_configure.getDbDriver());
			conn = DriverManager.getConnection(m_configure.getDbURL(), m_configure.getDbUser(), m_configure.getDbPass());
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
//			e.printStackTrace();
			System.err.println("DB exception:" + e.getMessage());
		}
		return conn;
	}

    private static DateFormat DateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");
    public ArrayList queryEvents(int seqId) {
    	ArrayList list = new ArrayList();
//    	if(true) {//for test when no database link
//			Event event = new Event();
//			event.setCardId("00000000000000000000000A");
//			event.setDeviceId("00:1B:5F:00:3B:F1_0");
//			event.setTime(new Date().getTime());
//			list.add(event);
//    		return list;
//    	}
    	ResultSet rs = null;
    	try {
			if(m_connection == null) {
				m_connection = getConnection();
				if(m_connection == null) {
					try {
						Thread.sleep(500);
					} catch(Exception ex) {
					}
					m_connection = getConnection();
					if(m_connection == null) {
						try {
							Thread.sleep(500);
						} catch(Exception ex) {
						}
						m_connection = getConnection();
					}
				}
			}
			if(m_connection == null) {
				return list;
			}
			Statement statement = m_connection.createStatement();
			
			String sql = "select t.trans_seq,t.card_id,t.mac_address,t.ant_id,t.up_date,t.up_time from CARDPOSITIONTRANS t where t.trans_seq > " + seqId;
//			System.err.println(sql);
			rs = statement.executeQuery(sql);
			
			while(rs.next()) {
				int theSeqId = rs.getInt(1);
				String cardId = rs.getString(2).trim();
				String address = rs.getString(3).trim();
				String antId = rs.getString(4).trim();
				String date = rs.getString(5).trim();
				String time = rs.getString(6).trim();
				
				try {
					String deviceId = address + "_" + antId;
					Date dateTime = DateFormat.parse(date + " " + time);
					long theTime = dateTime.getTime();
					Event event = new Event();
					event.setSeqId(theSeqId);
					event.setCardId(cardId);
					event.setDeviceId(deviceId);
					event.setTime(theTime);
					list.add(event);
				} catch(Exception ex) {
					ex.printStackTrace();
				}
			}
		} catch (SQLException e) {
//			e.printStackTrace();
			System.err.println("DB Exception:" + e.getMessage());
			m_connection = null;
		}
    	return list;
    }

	
    public ArrayList queryHistoryEvents(String cardId,String theDate) {
    	ArrayList<Event> list = new ArrayList<Event>();
    	ResultSet rs = null;
    	try {
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			
			rs = statement.executeQuery("select t.card_id,t.mac_address,t.up_date,t.up_time from CARDPOSITIONTRANS t");
			
			while(rs.next()) {
				cardId = rs.getString(1).trim();
				String deviceId = rs.getString(2).trim();
				String date = rs.getString(3).trim();
				String time = rs.getString(4).trim();
				
				try {
					Date dateTime = DateFormat.parse(date + " " + time);
					long theTime = dateTime.getTime();
					Event event = new Event();
					event.setCardId(cardId);
					event.setDeviceId(deviceId);
					event.setTime(theTime);
					list.add(event);
				} catch(Exception ex) {
					ex.printStackTrace();
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return list;
    }

	
	public static void main(String[] args) {
		DBManager.getInstance().queryEvents(0);
	}
}
