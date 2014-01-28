package com.inesazt.visitors.manager.task;

import java.util.Date;
import java.util.List;
import java.util.TimerTask;

import com.inesazt.visitors.manager.bo.ManagerBoImpl;
import com.inesazt.visitors.manager.dao.ManagerDaoImpl;
import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblFacilityInfo;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;

public class UnBindCardWorker extends TimerTask {
	private boolean isRunning = false;
	public static final long LoopTime = 24 * 3600 * 1000;//24小时

	public UnBindCardWorker() {
	}

	public void run() {
		if (!isRunning) {
			isRunning = true;

			doLoopWork();
			
			isRunning = false;
		} else {
		}
	}
	
	private static int m_loopIndex = 0;
	private void doLoopWork() {
		m_loopIndex++;
//		System.err.println("do task loop:" + m_loopIndex);
		
		ManagerBoImpl managerBoImpl = new ManagerBoImpl();
		List<TblCard> cardList = managerBoImpl.getCardList();
		StringBuffer binds = new StringBuffer();
		for(TblCard card : cardList){
			String cardNo = card.getCardNo();
			Integer ownerType = card.getOwnerType();
			boolean isGuest = card.isGuest();
			if(isGuest){//访客
				List<TblGuestInfo> guestInfoList = managerBoImpl.getGuestInfoByCard(cardNo);
				if(guestInfoList != null && guestInfoList.size() == 1){
					TblGuestInfo guestInfo = guestInfoList.get(0);
					if(guestInfo.getCardStatus() == TblGuestInfo.cardStatus_bind){
						String guestId = guestInfo.getId().toString();
						binds.append(guestId + ":" + cardNo + ":" + ownerType + ",");
					}
				}					
			}else{//厂务人员
				List<TblFacilityInfo> facilityInfoList = managerBoImpl.getFacilityInfoByCard(cardNo);
				if(facilityInfoList != null && facilityInfoList.size() == 1){
					TblFacilityInfo facilityInfo = facilityInfoList.get(0);
					if(facilityInfo.getCardStatus() == TblFacilityInfo.cardStatus_bind){
						String facilityId = facilityInfo.getId().toString();
						binds.append(facilityId + ":" + cardNo + ":" + ownerType + ",");
					}
				}	
			}
		}
		ManagerDaoImpl managerDaoImpl = new ManagerDaoImpl();
		if(binds.length() > 0){
			managerDaoImpl.updateBind(binds.toString(), TblGuestInfo.cardStatus_unbind);
		}
		System.out.println(new Date() + "解除绑定的序列：" + binds);
	}
	
}
