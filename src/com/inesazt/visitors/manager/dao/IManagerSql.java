package com.inesazt.visitors.manager.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblFacilityInfo;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;
import com.inesazt.visitors.manager.pojo.TblRole;

public interface IManagerSql {    

    public void insertTblGuestInfo(TblGuestInfo e);
    
    //更新访客表
    public void updateTblGuestInfoByEntity(TblGuestInfo e);
    
    public List<TblGuestInfo> getGuestInfoBySqNumAndPassId(TblGuestInfo info);
    
    public List<TblCard> getCardList(TblCard card);
    
    //更新访客表
    public void updateTblGuestInfo(@Param("guestId") String guestId, @Param("cardNo") String cardNo, @Param("status") Integer status);
    
    //更新卡表
    public void updateTblCard(@Param("cardNo") String cardNo, @Param("status") Integer status, @Param("ownerType") Integer ownerType);
    
    //RFID不变更,更新卡表各列
    public void updateTblCardByRfid(TblCard param);
    
    //更新卡表的角色名称
    public void updateTblCardRoleName(Map param);
    
    //插入新卡
    public void insertTblCard(TblCard param);
    
    //根据RFID搜索卡表
    public List<TblCard> getCardByRfid(TblCard param);
    
    //根据卡号查找访客信息
    public List<TblGuestInfo> getGuestInfoByCard(String cardNo);
    
    
    /*******************************厂务人员API**/
    //返回厂务人员列表
    public List<TblFacilityInfo> queryFacilitys(TblFacilityInfo info);
    
    //更新厂务人员表
    public void updateTblFacilityInfo(@Param("facilityId") String facilityId, @Param("cardNo") String cardNo, @Param("status") Integer status);
    
    //根据卡号查找厂务人员信息
    public List<TblFacilityInfo> getFacilityInfoByCard(String cardNo);
    
    
    /***************************权限API*****************************/
    //返回权限列表
    public List<TblRole> getRoleList(TblRole role);
    
    //插入新的角色
    public void insertTblRole(TblRole role);
    
    //更新角色
    public void updateTblRole(TblRole role);
}