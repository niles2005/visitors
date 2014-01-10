package com.inesazt.visitors.manager.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;

public interface IManagerSql {    

    public void insertTblGuestInfoOracle(TblGuestInfo e);
    
    public void insertTblGuestInfoSqlite(TblGuestInfo e);
    
    public List<TblGuestInfo> getGuestInfoBySqNumAndPassId(TblGuestInfo info);
    
    public List<TblCard> getCardList();
    
    //更新访客表
    public void updateTblGuestInfoOracle(@Param("guestId") String guestId, @Param("cardNo") String cardNo, @Param("status") Integer status);
    
    //更新访客表
    public void updateTblGuestInfoSqlite(@Param("guestId") String guestId, @Param("cardNo") String cardNo, @Param("status") Integer status);
    
    //更新卡表
    public void updateTblCardOracle(@Param("cardNo") String cardNo, @Param("status") Integer status);
    
    //更新卡表
    public void updateTblCardSqlite(@Param("cardNo") String cardNo, @Param("status") Integer status);
    
}