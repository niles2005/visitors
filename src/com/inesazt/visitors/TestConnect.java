package com.inesazt.visitors;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TestConnect {
	public TestConnect() {
//		doAtoBuilding1();
		doAtoFactory();
	}
	
    private static DateFormat DateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");
	private void doAtoBuilding1() {
		try {
			Connection ct = null;
			String ip = "192.168.1.203";// db ip
			String port = "1521";//
			String sid = "UNPAY";
			String userName = "gis";
			String passWord = "gis";
			ct = getConnection(ip, port, sid, userName, passWord);
			Statement sm = ct.createStatement();
			String dateTime = DateFormat.format(new Date());
			int pos = dateTime.indexOf(" ");
			String strDate = null;
			String strTime = null;
			if(pos != -1) {
				strDate = dateTime.substring(0,pos);
				strTime = dateTime.substring(pos + 1);
			}
			ResultSet rs = sm.executeQuery("insert into cardpositiontrans(card_id,reader_name,up_date,up_time,mac_address,trans_seq) values('aaaa','Alien RFID Reader','" + strDate + "','" + strTime + "','00:1B:5F:00:81:98',SEQ_CARDTRANS.NEXTVAL)");
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		
	}
	
	private void doAtoFactory() {
		try {
			Connection ct = null;
			String ip = "192.168.1.203";// db ip
			String port = "1521";//
			String sid = "UNPAY";
			String userName = "gis";
			String passWord = "gis";
			ct = getConnection(ip, port, sid, userName, passWord);
			// 从下面开始，和SQL Server一模一样
			Statement sm = ct.createStatement();
			String dateTime = DateFormat.format(new Date());
			int pos = dateTime.indexOf(" ");
			String strDate = null;
			String strTime = null;
			if(pos != -1) {
				strDate = dateTime.substring(0,pos);
				strTime = dateTime.substring(pos + 1);
			}
    		ResultSet rs = sm.executeQuery("insert into cardpositiontrans(card_id,reader_name,up_date,up_time,mac_address,trans_seq) values('aaaa','Alien RFID Reader','" + strDate + "','" + strTime + "','00:1B:00:88',SEQ_CARDTRANS.NEXTVAL)");
		} catch(Exception ex) {
			ex.printStackTrace();
		}
		
	}
	
	public static void main(String[] args) throws SQLException {
		new TestConnect();
	}

	public Connection getConnection(String ip, String port, String sid,
			String userName, String passWord) {
		String driverName = "oracle.jdbc.driver.OracleDriver";// 连接oracle驱动包
		String dbUrl = "jdbc:oracle:thin:@" + ip + ":" + port + ":" + sid + "";
		Connection conn = null;

		// 从下面开始，和SQL Server一模一样
		try {
			Class.forName(driverName);
			conn = DriverManager.getConnection(dbUrl, userName, passWord);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}
	
}