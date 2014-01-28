package com.inesazt.visitors.manager.bo;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.tempuri.Service1Soap_Service1Soap_Client;

import com.alibaba.fastjson.JSON;
import com.inesazt.visitors.Card;
import com.inesazt.visitors.Global;
import com.inesazt.visitors.manager.dao.ManagerDaoImpl;
import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblFacilityInfo;
import com.inesazt.visitors.manager.pojo.TblGuestInfo;


/**
 * 管理平台业务逻辑
 * @author xyc
 *
 */
public class ManagerBoImpl {
	
	private ManagerDaoImpl managerDaoImpl = new ManagerDaoImpl();

	private Service1Soap_Service1Soap_Client wsClient = new Service1Soap_Service1Soap_Client();
	
	private List<TblGuestInfo> guestInfoList;
	
	/**
	 * 获取访客列表
	 * 1.根据陪同工号调用ws接口，返回当前陪同工号下的访客名单字符串
	 * 2.解析访客名单字符串，封装成TblGuestInfo对象，并加入到List中
	 * 3.保存访客名单，并返回List的json格式字符串
	 * @param attendantCode
	 * @return
	 */
	public String getGuestList(String attendantCode, String cardStatus){
		
		String result = "";
		if(attendantCode != null){
			String str = wsClient.getGuestList(attendantCode);
			//System.out.println(str);
			//1:SQNum {SQ00753290}, 1:TimeIn {12/23/2013 12:00:00 AM}, 1:TimeOut {1/6/2014 12:00:00 AM},
			if(str != null && str.length() > 0){
				TblGuestInfo guestInfo = null;
				String items[] = str.split("},");
				Integer i = 0;//判断有几条数据
				for(String item : items){
					//1:SQNum {SQ00753290
					if(item != null && item.length() > 0 && item.indexOf(":") != -1){
						String itemStrs[] = item.split(":", 2);
						String key = itemStrs[0].trim();
						if(Integer.parseInt(key) > i){
							guestInfo = getGuestInfo();//得到一个guestInfo对象
							guestInfo.setAttendant(attendantCode);
							i ++;
							//System.out.println(i);
						}
						//SQNum {SQ00753290
						String value = itemStrs[1];
						String fieldName = value.substring(0, value.indexOf("{")).trim();
						String fieldValue = value.substring(value.indexOf("{") + 1);
						//字段赋值
						guestInfo.setField(fieldName, fieldValue);
						//System.out.println("fieldName: " + fieldName + "," + "fieldValue: " + fieldValue);
					}
				}
				
				if(guestInfoList != null){
					managerDaoImpl.saveGuestInfoList(guestInfoList);
					//如果cardStatus参数为1，表示只查询未绑定的访客列表，去掉已绑定过了的访客列表
					if(cardStatus != null && cardStatus.equals("1")){
						List<TblGuestInfo> list = new ArrayList<TblGuestInfo>();
						for(TblGuestInfo info : guestInfoList){
							Integer status = info.getCardStatus();
							if(status == null || status != 2){
								list.add(info);
							}
						}
						guestInfoList = list;
					}
					result = JSON.toJSONString(guestInfoList);
				}
			}
		}
		return result;
	}
	
	//生成一个TblGuestInfo对象，并放入list缓存
	private TblGuestInfo getGuestInfo(){
		
		TblGuestInfo guestInfo = new TblGuestInfo();
		if(guestInfoList == null){
			guestInfoList = new ArrayList<TblGuestInfo>(); 
		}
		guestInfoList.add(guestInfo);
		return guestInfo;
	}
	
	//获取未绑定的卡
	public String getUnBindCardList(){
		
		List<TblCard> unBindCardList = new ArrayList<TblCard>();
		List<TblCard> allCardList = managerDaoImpl.getCardList(null);
		if(allCardList != null){
			for(TblCard card : allCardList){
				if(card.getCardStatus() == 1){
					unBindCardList.add(card);
				}
			}
			return JSON.toJSONString(unBindCardList);
		}
		return null;
	}
	
	public String getCardList(TblCard card){
		
		List<TblCard> cardList = managerDaoImpl.getCardList(card);
		if(cardList != null){
			return JSON.toJSONString(cardList);
		}
		return null;
	}
	
	//根据卡号获取访客
	public List<TblGuestInfo> getGuestInfoByCard(String cardNo){
		
		return managerDaoImpl.getGuestInfoByCard(cardNo);
	}

	//根据卡号获取厂务人员
	public List<TblFacilityInfo> getFacilityInfoByCard(String cardNo){
		
		return managerDaoImpl.getFacilityInfoByCard(cardNo);
	}
	
	//获取卡
	public List<TblCard> getCardList(){
		
		return managerDaoImpl.getCardList(null);
	}
	
	//添加或更新卡
	public boolean updateOrInsertTblCard(TblCard tblCard){
		
		List<TblCard> tblCardList = managerDaoImpl.getCardByRfid(tblCard);
		if(tblCardList !=null && tblCardList.size() > 0){
			return managerDaoImpl.updateTblCard(tblCard);
		}else{
			tblCard.setCardStatus(1); //初始状态1表示未绑定
			return managerDaoImpl.insertTblCard(tblCard);
		}
	}
	
	//保存绑定关系
	public String saveBind(String binds){
		
		String result = null;
		if(StringUtils.isNotBlank(binds)){
			managerDaoImpl.updateBind(binds, TblGuestInfo.cardStatus_bind);
			
			//并更新缓存
			String[] items = binds.split(",");
			for(String item : items){
				String[] values = item.split(":");
				if(values.length == 3){
					String cardNo = values[1];
					updateCardCache(cardNo);			
				}
			}			
			result = "已成功保存绑定关系";
		}
		return result;
	}
	
	//删除绑定关系
	public String deleteBind(String binds){
		
		String result = null;
		if(StringUtils.isNotBlank(binds)){
			managerDaoImpl.updateBind(binds, TblGuestInfo.cardStatus_unbind);
			
			//并更新缓存
			String[] items = binds.split(",");
			for(String item : items){
				String[] values = item.split(":");
				if(values.length == 3){
					String cardNo = values[1];
					updateCardCache(cardNo);			
				}
			}
			result = "已成功删除绑定关系";
		}
		return result;
	}
	
	//更新Card缓存：在每次tblCard变化后调用这方法
	private void updateCardCache(String cardNo){
		TblCard tCard = new TblCard(cardNo, null, null);
		List<TblCard> list = managerDaoImpl.getCardList(tCard);
		if(list != null && list.size() > 0){
			tCard = list.get(0);
			String rfidNo = tCard.getRfidNo();
			Card card = Global.getInstance().getCard(rfidNo);
			Global.getInstance().updateCard(card, tCard);
		}		
	}
	
	
	//根据卡No删除绑定关系
	public String deleteBindByCardNos(String nos){
		
		String result = null;
		if(StringUtils.isNotBlank(nos)){
			StringBuffer binds = new StringBuffer();
			String[] cardNos = nos.split(",");
			for(String cardNo : cardNos){
				TblCard tCard = new TblCard(cardNo, null, null);
				List<TblCard> cardList = managerDaoImpl.getCardList(tCard);//根据卡号查卡表，获取用户类型
				if(cardList != null && cardList.size() > 0){
					Integer ownerType = cardList.get(0).getOwnerType();
					boolean isGuest = cardList.get(0).isGuest();//判断是否是访客类型卡
					if(isGuest){//访客
						List<TblGuestInfo> guestList = managerDaoImpl.getGuestInfoByCard(cardNo);
						if(guestList != null && guestList.size() > 0){
							TblGuestInfo guestInfo = guestList.get(0);
							if(guestInfo.getCardStatus() == TblGuestInfo.cardStatus_bind){
								String guestId = guestInfo.getId().toString();
								binds.append(guestId + ":" + cardNo + ":" + ownerType + ",");
							}
						}else{
							result = "未在访客信息表中找到绑定了卡号为:[" + cardNo + "]的访客";
							return result;
						}						
					}else{//厂务人员
						List<TblFacilityInfo> facilityList = managerDaoImpl.getFacilityInfoByCard(cardNo);
						if(facilityList != null && facilityList.size() > 0){
							TblFacilityInfo facilityInfo = facilityList.get(0);
							if(facilityInfo.getCardStatus() == TblFacilityInfo.cardStatus_bind){
								String facilityId = facilityInfo.getId().toString();
								binds.append(facilityId + ":" + cardNo + ":" + ownerType + ",");
							}
						}else{
							result = "未在厂务人员信息表中找到绑定了卡号为:[" + cardNo + "]的厂务人员";
							return result;
						}	
					}
				}else{
					result = "未在卡信息表中找到卡号为:[" + cardNo + "]的卡";
					return result;
				}
			}
			
			managerDaoImpl.updateBind(binds.toString(), TblGuestInfo.cardStatus_unbind);
			
			//并更新缓存
			for(String cardNo : cardNos){
				updateCardCache(cardNo);				
			}
			
			result = "已成功删除绑定关系";
		}
		return result;
	}	
	
	
	/***********************厂务人员API*************************/
	
	public String queryFacilitys(TblFacilityInfo info){
		
		List<TblFacilityInfo> list =  managerDaoImpl.queryFacilitys(info);
		if(list != null && list.size() > 0){
			return JSON.toJSONString(list);
		}
		return null;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
