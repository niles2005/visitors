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
    private static final String IP = "192.168.1.203";
    private static final String PORT = "1521";//
    private static final String SID = "UNPAY";
    private static final String USERNAME = "gis";
    private static final String PASSWORD = "gis";
    private static final String DRIVERNAME = "oracle.jdbc.driver.OracleDriver";// ����oracle���
    private static final String DBURL = "jdbc:oracle:thin:@" + IP + ":" + PORT + ":" + SID + "";

    private static DBManager m_instance = null;
    
    public static DBManager getInstance() {
    	if(m_instance == null) {
    		m_instance = new DBManager();
    	}
    	return m_instance;
    }
    
    private DBManager() {
	}
    
    private Connection getConnection() {
		Connection conn = null;
		try {
			Class.forName(DRIVERNAME);
			conn = DriverManager.getConnection(DBURL, USERNAME, PASSWORD);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}

    private static DateFormat DateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");
    public ArrayList queryEvents() {
    	ArrayList list = new ArrayList();
    	ResultSet rs = null;
    	try {
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			
			rs = statement.executeQuery("select t.card_id,t.mac_address,t.up_date,t.up_time from CARDPOSITIONTRANS t");
			
			while(rs.next()) {
				String cardId = rs.getString(1).trim();
				String deviceId = rs.getString(2).trim();
				String date = rs.getString(3).trim();
				String time = rs.getString(4).trim();
				
				try {
//					System.err.println(cardId);
//					System.err.println(deviceId);
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

	
    public ArrayList queryHistoryEvents(String cardId,String theDate) {
    	ArrayList list = new ArrayList();
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
//					System.err.println(cardId);
//					System.err.println(deviceId);
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
		DBManager.getInstance().queryEvents();
	}
}
