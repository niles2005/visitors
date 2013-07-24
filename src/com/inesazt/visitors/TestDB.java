package com.inesazt.visitors;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TestDB {
    private static final String IP = "192.168.1.203";
    private static final String PORT = "1521";//
    private static final String SID = "UNPAY";
    private static final String USERNAME = "gis";
    private static final String PASSWORD = "gis";
    private static final String DRIVERNAME = "oracle.jdbc.driver.OracleDriver";// ����oracle���
    private static final String DBURL = "jdbc:oracle:thin:@" + IP + ":" + PORT + ":" + SID + "";

    public TestDB() {
    	search();
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
    
    public ResultSet search(){
    	ResultSet rs = null;
    	try {
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			
	    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
	    	String today = dateFormat.format(new Date());
			
			rs = statement.executeQuery("select t.trans_seq,t.card_id,t.up_date,t.up_time,t.mac_address from CARDPOSITIONTRANS t");
			
			while(rs.next()) {
				System.err.println(rs.getObject(1));
				System.err.println(rs.getObject(2));
				System.err.println(rs.getObject(3));
				System.err.println(rs.getObject(4));
				System.err.println(rs.getObject(5));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return rs;
    }

	
	public static void main(String[] args) {
		new TestDB();
	}
}
