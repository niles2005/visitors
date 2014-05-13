package com.inesazt.visitors.manager.dao;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.inesazt.visitors.ServerConfig;
import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblFacilityInfo;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;
import com.inesazt.visitors.manager.pojo.TblRole;
import com.inesazt.visitors.util.MyLogUtil;

/**
 * @author Dell
 *
 */
/**
 * @author Dell
 *
 */
public class ManagerDaoImpl {
	
	private static Log log = LogFactory.getLog(ManagerDaoImpl.class);

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
	 * 2.如果存在，则直接刷回List中,如果不存在，则插入数据库，再重新查找该记录以得到主键ID，最后刷回List中
	 * @param guestInfoList
	 */
	public void saveGuestInfoList(List<TblGuestInfo> guestInfoList){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			for(int i = 0; i < guestInfoList.size(); i ++){
				TblGuestInfo e = guestInfoList.get(i);
				List<TblGuestInfo> savedList = managerSql.getGuestInfoBySqNumAndPassId(e);
				if(savedList == null || savedList.size() == 0){
					managerSql.insertTblGuestInfo(e);
					e = managerSql.getGuestInfoBySqNumAndPassId(e).get(0);
					guestInfoList.set(i, e);
				}else{
					managerSql.updateTblGuestInfoByEntity(e);
					TblGuestInfo savedEntity = managerSql.getGuestInfoBySqNumAndPassId(e).get(0);
					e.setId(savedEntity.getId());//为主键赋值
					e.setCardStatus(savedEntity.getCardStatus());
					e.setCardNo(savedEntity.getCardNo());
					guestInfoList.set(i, e);
					//System.out.println(infos.get(0).getId() + ", " + infos.get(0).getSqNum() + ", " + infos.get(0).getPassId());
				}
			}
			session.commit();

		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}		
	}
	
	//获取卡列表
	public List<TblCard> getCardList(TblCard card){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			return managerSql.getCardList(card);
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	//根据卡号获取访客信息
	public List<TblGuestInfo> getGuestInfoByCard(String cardNo){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			return managerSql.getGuestInfoByCard(cardNo);
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	//根据rfid获取卡
	public List<TblCard> getCardByRfid(TblCard tblCard){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			return managerSql.getCardByRfid(tblCard);
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	//更新卡
	public boolean updateTblCard(TblCard tblCard){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			managerSql.updateTblCardByRfid(tblCard);
			session.commit();
			return true;
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	//插入新卡
	public boolean insertTblCard(TblCard tblCard){
			
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			managerSql.insertTblCard(tblCard);
			session.commit();
			return true;
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	//更新绑定关系
	public void updateBind(String binds, Integer status){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			String[] items = binds.split(",");
			for(String item : items){
				String[] values = item.split(":");
				if(values.length == 3){
					String userId = values[0];
					String cardNo = values[1];
					Integer ownerType = Integer.parseInt(values[2]);
					String userCardNo = cardNo;
					Integer userOwnerType = ownerType;
					if(status == TblGuestInfo.cardStatus_unbind){//状态为1的同时将userCardNo和userOwnerType清空，并更新缓存
						userCardNo = "";
						userOwnerType = 0;
					}
					//根据ownerType判断是访客发卡还是厂务人员发卡.2表示厂务人员
					if(ownerType == 2){
						managerSql.updateTblFacilityInfo(userId, userCardNo, status);
					}else{
						managerSql.updateTblGuestInfo(userId, userCardNo, status);
					}
					managerSql.updateTblCard(cardNo, status, userOwnerType);
				}
			}
			session.commit();

		} catch (Exception e) {
			log.error("更新绑定关系[updateBind]发生错误: " + "绑定关系： [" + binds + "]" + "绑定状态： " + status);
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}		
	}
	
	
	/**********************厂务人员API*********************/
	
	//获取厂务人员列表
	public List<TblFacilityInfo> queryFacilitys(TblFacilityInfo info){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			return managerSql.queryFacilitys(info);
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	
	//根据卡号获取厂务人员信息
	public List<TblFacilityInfo> getFacilityInfoByCard(String cardNo){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			return managerSql.getFacilityInfoByCard(cardNo);
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	

	/**
	 * 获取权限列表
	 * @return
	 */
	public List<TblRole> getRoleList(TblRole role){
		
		SqlSession session = null;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			return managerSql.getRoleList(role);
		} catch (Exception e) {
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	/**
	 * 插入新的角色
	 * @param role
	 * @return
	 */
	public boolean insertTblRole(TblRole role){
		SqlSession session = null;
		boolean isSuccess = true;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			managerSql.insertTblRole(role);
			session.commit();
		} catch (Exception e) {
			isSuccess = false;
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return isSuccess;
	}
	
	/**
	 * 更新角色
	 * @param role
	 * @return
	 */
	public boolean updateTblRole(TblRole role ,String oldRoleName) {
		SqlSession session = null;
		boolean isSuccess = true;
		try {
			session = m_sqlSessionFactory.openSession();
			IManagerSql managerSql = session.getMapper(IManagerSql.class);
			managerSql.updateTblRole(role);
			if( !role.getName().equals(oldRoleName)){
				Map<String, String> param = new HashMap<String, String>();
				param.put("oldRoleName", oldRoleName);
				param.put("roleName", role.getName());
				managerSql.updateTblCardRoleName(param);
			}
			session.commit();
		} catch (Exception e) {
			isSuccess = false;
			log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
		} finally {
			if (session != null) {
				session.close();
			}
		}
		return isSuccess;
		
	}
	
}
