package com.inesazt.visitors.manager.dao;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import javax.sql.DataSource;

import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.inesazt.visitors.ServerConfig;
import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;

public class ManagerDaoImpl {

	private SqlSessionFactory m_sqlSessionFactory = null;
	
	private String DBType;
	
	public ManagerDaoImpl(){
		
		try {
			Reader reader = new BufferedReader(new InputStreamReader(new FileInputStream(ServerConfig.getInstance().getMybatisConfigureFile()), "UTF-8"));
			m_sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
			Environment environment = m_sqlSessionFactory.getConfiguration().getEnvironment();
			DataSource dataSource = environment.getDataSource();
			// org.sqlite.MetaData@1028607
			// oracle.jdbc.driver.OracleDatabaseMetaData@1fb9d58
			String metaDataClass = dataSource.getConnection().getMetaData().toString().toLowerCase();
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
	}
	
	/**
	 * 保存访客名单List，并将数据库最新信息刷回List中返回给调用处
	 * 1.遍历List，根据sqNum和passId查找是否已存在此条记录
	 * 2.如果存在，则直接刷回List中,如果不存在，则插入数据库，再重新查找改记录以得到主键ID，最后刷回List中
	 * @param guestInfoList
	 */
	public void saveGuestInfoList(List<TblGuestInfo> guestInfoList){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			if ("oracle".equals(DBType)) {
				for(int i = 0; i < guestInfoList.size(); i ++){
					TblGuestInfo e = guestInfoList.get(i);
					List<TblGuestInfo> savedList = managerSql.getGuestInfoBySqNumAndPassId(e);
					if(savedList == null || savedList.size() == 0){
						managerSql.insertTblGuestInfoOracle(e);
						e = managerSql.getGuestInfoBySqNumAndPassId(e).get(0);
						guestInfoList.set(i, e);
					}else{
						guestInfoList.set(i, savedList.get(0));
						//System.out.println(infos.get(0).getId() + ", " + infos.get(0).getSqNum() + ", " + infos.get(0).getPassId());
					}
				}
			} else if ("sqlite".equals(DBType)) {
				for(int i = 0; i < guestInfoList.size(); i ++){
					TblGuestInfo e = guestInfoList.get(i);
					List<TblGuestInfo> savedList = managerSql.getGuestInfoBySqNumAndPassId(e);
					if(savedList == null || savedList.size() == 0){
						managerSql.insertTblGuestInfoSqlite(e);
						e = managerSql.getGuestInfoBySqNumAndPassId(e).get(0);
						guestInfoList.set(i, e);
					}else{
						guestInfoList.set(i, savedList.get(0));
						//System.out.println(infos.get(0).getId() + ", " + infos.get(0).getSqNum() + ", " + infos.get(0).getPassId());
					}
				}
			} else if ("sqlserver".equals(DBType)) {
				for(int i = 0; i < guestInfoList.size(); i ++){
					TblGuestInfo e = guestInfoList.get(i);
					List<TblGuestInfo> savedList = managerSql.getGuestInfoBySqNumAndPassId(e);
					if(savedList == null || savedList.size() == 0){
						managerSql.insertTblGuestInfoSqlite(e);
						e = managerSql.getGuestInfoBySqNumAndPassId(e).get(0);
						guestInfoList.set(i, e);
					}else{
						guestInfoList.set(i, savedList.get(0));
						//System.out.println(infos.get(0).getId() + ", " + infos.get(0).getSqNum() + ", " + infos.get(0).getPassId());
					}
				}
			}
			session.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}		
	}
	
	//获取卡列表
	public List<TblCard> getCardList(){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			List<TblCard> cardList = null;
			if ("oracle".equals(DBType)) {
				cardList = managerSql.getCardList();
			} else if ("sqlite".equals(DBType)) {
				cardList = managerSql.getCardList();
			} else if ("sqlserver".equals(DBType)) {
				cardList = managerSql.getCardList();
			}
			return cardList;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return null;
	}
	
	//更新绑定关系
	public void updateBind(String binds, Integer status){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);

			if ("oracle".equals(DBType)) {
				String[] items = binds.split(",");
				for(String item : items){
					String[] values = item.split(":");
					if(values.length == 2){
						String guestId = values[0];
						String cardNo = values[1];
						String guestInfoCardNo = cardNo;
						if(status == TblGuestInfo.cardStatus_unbind){//状态为1的同时将guestInfoCardNo清空
							guestInfoCardNo = "";
						}
						managerSql.updateTblGuestInfoOracle(guestId, guestInfoCardNo, status);
						managerSql.updateTblCardOracle(cardNo, status);
						
					}
				}
			} else if ("sqlite".equals(DBType)) {
				String[] items = binds.split(",");
				for(String item : items){
					String[] values = item.split(":");
					if(values.length == 2){
						String guestId = values[0];
						String cardNo = values[1];
						String guestInfoCardNo = cardNo;
						if(status == TblGuestInfo.cardStatus_unbind){//状态为1的同时将guestInfoCardNo清空
							guestInfoCardNo = "";
						}
						managerSql.updateTblGuestInfoSqlite(guestId, guestInfoCardNo, status);
						managerSql.updateTblCardSqlite(cardNo, status);
					}
				}
			} else if ("sqlserver".equals(DBType)) {
				String[] items = binds.split(",");
				for(String item : items){
					String[] values = item.split(":");
					if(values.length == 2){
						String guestId = values[0];
						String cardNo = values[1];
						String guestInfoCardNo = cardNo;
						if(status == TblGuestInfo.cardStatus_unbind){//状态为1的同时将guestInfoCardNo清空
							guestInfoCardNo = "";
						}
						managerSql.updateTblGuestInfoSqlite(guestId, guestInfoCardNo, status);
						managerSql.updateTblCardSqlite(cardNo, status);
					}
				}
			}
			session.commit();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (session != null) {
				session.close();
			}
		}		
	}
	
}
