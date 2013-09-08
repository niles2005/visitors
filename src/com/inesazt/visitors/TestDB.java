package com.inesazt.visitors;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import oracle.jdbc.driver.OraclePreparedStatement;

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
//    	ServerConfig.initInstance("D:/mywork/inesazt/workspace/visitors/tomcat/deploy/visitors_deploy20130903/WebContent");
//    	Global.initInstance();
//    	Global.getInstance().getDevices().doList();
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
//			Statement statement = connection.createStatement();
	    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
	    	String today = dateFormat.format(new Date());
			
//	    	String sql = "select t.trans_seq,t.card_id,t.ant_id,t.up_date,t.up_time,t.mac_address from CARDPOSITIONTRANS t where t.card_id='aaaa' and t.up_date='2013/07/30'";
//	    	String sql = "select t.trans_seq,t.card_id,t.ant_id,t.up_date,t.up_time,t.mac_address from CARDPOSITIONTRANS t";
	    	String sql = "select t.trans_seq,t.card_id,t.mac_address,t.ant_id,t.up_date,t.up_time from CARDPOSITIONTRANS t where t.card_id = ? and t.up_date=?";
	    	OraclePreparedStatement pstmt = (OraclePreparedStatement)connection.prepareStatement(sql);
	    	pstmt.setFixedCHAR(1, "testzang");
//	    	pstmt.setObject(1, );
//	    	pstmt.setString(1, "testzang");
	    	pstmt.setString(2, "2013/09/03");
	    	
	    	rs = pstmt.executeQuery();
	    	
	    	
//			rs = statement.executeQuery(sql);
			
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
