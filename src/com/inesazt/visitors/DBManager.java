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
    private Statement m_statement = null;
    private void initConnection() {
		try {
			Class.forName(m_configure.getDbDriver());
			m_connection = DriverManager.getConnection(m_configure.getDbURL(), m_configure.getDbUser(), m_configure.getDbPass());
			if(m_connection != null) {
				m_statement = m_connection.createStatement();
			}
		} catch (Exception e) {
//			e.printStackTrace();
			System.err.println("DB exception:" + e.getMessage());
			m_connection = null;
		}
	}
    
    private void checkConnection() throws Exception {
		if(m_connection == null) {
			initConnection();
			if(m_connection == null) {
				try {
					Thread.sleep(500);
				} catch(Exception ex) {
				}
				initConnection();
				if(m_connection == null) {
					try {
						Thread.sleep(500);
					} catch(Exception ex) {
					}
					initConnection();
				}
			}
		}
    }

    private static DateFormat DateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");
    public ArrayList queryEvents(int seqId,Devices devices,String strDBToday) {
    	ArrayList list = new ArrayList();
    	ResultSet rs = null;
    	try {
    		checkConnection();
			if(m_connection == null) {
				return list;
			}
			String sql = "select t.trans_seq,t.card_id,t.mac_address,t.ant_id,t.up_date,t.up_time from CARDPOSITIONTRANS t where  t.up_date>='" + strDBToday + "' and t.trans_seq > " + seqId;
//			System.err.println(sql);
			rs = m_statement.executeQuery(sql);
			
			buildEvents(rs,list,devices);
			rs.close();
		} catch (Exception e) {
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
    		checkConnection();
			if(m_connection == null) {
				return list;
			}
			String dbDate = DateTimeUtil.date8ToDate10(theDate);
			String sql = "select t.trans_seq,t.card_id,t.mac_address,t.ant_id,t.up_date,t.up_time from CARDPOSITIONTRANS t where t.card_id='" + cardId + "' and t.up_date='" + dbDate + "'";
//			System.err.println(sql);
			rs = m_statement.executeQuery(sql);
			
			Devices devices = Global.getInstance().getDevices();
			buildEvents(rs,list,devices);

			rs.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return list;
    }

    private void buildEvents(ResultSet rs,ArrayList list,Devices devices) throws SQLException {
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
				
				Device device = devices.getDevice(deviceId);
				if(device == null) {
					device = devices.buildDevice(deviceId);
				}
				event.setDevice(device);
				
				list.add(event);
			} catch(Exception ex) {
				ex.printStackTrace();
			}
		}    	
    }
}
