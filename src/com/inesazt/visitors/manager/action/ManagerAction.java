package com.inesazt.visitors.manager.action;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inesazt.visitors.Global;
import com.inesazt.visitors.WebUtil;
import com.inesazt.visitors.manager.bo.ManagerBoImpl;
import com.inesazt.visitors.manager.pojo.TblCard;
import com.inesazt.visitors.manager.pojo.TblFacilityInfo;
import com.inesazt.visitors.manager.pojo.TblRole;
import com.inesazt.visitors.util.MyLogUtil;

/**
 * 管理平台的总入口
 * @author xyc
 *
 */

@WebServlet(name = "ManagerAction", urlPatterns = { "/mg" }, loadOnStartup=0)
public class ManagerAction extends HttpServlet {
	
	private static Log log = LogFactory.getLog(ManagerAction.class);
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		doPage(request, response);
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		doPage(request, response);
	}
	
	public void doPage(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
		ServletOutputStream sos = response.getOutputStream();
		try{
			request.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");			
			String action = request.getParameter("action");
			if(action != null){
				log.info("当前请求: " + request.getParameter("action"));
			}			
			String retInfo = doAction(request);
			
			if(retInfo != null) {
				String callback = request.getParameter("callback");
				if(callback != null) {
					retInfo = callback + "(" + retInfo + ");";
				}
				sos.write(retInfo.getBytes("UTF-8"));
			}				
		}catch(Exception e){
			log.error("ManagerAction发生未知异常：");
			log.error(MyLogUtil.getExceptionStr(e));
			sos.write("".getBytes("UTF-8"));
		}
	
	}

	//入口
	private String doAction(HttpServletRequest request) {

		String action = request.getParameter("action");
		if(action == null) {
			return WebUtil.error("unknown action!");
		}
		//获取访客列表
		if(action.equals("getGuestList")) {
			String attendantCode = request.getParameter("attendantCode");
			String cardStatus = request.getParameter("cardStatus");
			ManagerBoImpl managerBo = new ManagerBoImpl();
			return managerBo.getGuestList(attendantCode, cardStatus);
		}
		
		//获取未绑定卡列表
		if(action.equals("getUnBindCardList")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			return managerBo.getUnBindCardList();
		}
		
		//保存绑定关系
		if(action.equals("saveBind")) {
			
			ManagerBoImpl managerBo = new ManagerBoImpl();
			String binds = request.getParameter("binds");
			return managerBo.saveBind(binds);
		}
		
		//删除绑定关系
		if(action.equals("deleteBind")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			String binds = request.getParameter("binds");
			Global.getInstance().addGuestUpdateTime();
			return managerBo.deleteBind(binds);
		}
		
		//卡管理-根据卡ID删除绑定关系
		if(action.equals("deleteBindByCardNos")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			String nos = request.getParameter("nos");
			Global.getInstance().addGuestUpdateTime();
			return managerBo.deleteBindByCardNos(nos);
		}
		
		//卡管理-获取所有卡列表
		if(action.equals("getCardList")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			String cardNo = request.getParameter("cardNo");
			String rfidNo = request.getParameter("rfidNo");
			String cardStatus = request.getParameter("cardStatus");
			TblCard card = new TblCard(cardNo, rfidNo, cardStatus);
			return managerBo.getCardList(card);
		}
		
		/***************厂务人员action****************/
		//获取厂务人员列表
		if(action.equals("queryFacilitys")) {
			String name = request.getParameter("name");
			String number = request.getParameter("number");
			String cardStatus = request.getParameter("cardStatus");
			TblFacilityInfo info = new TblFacilityInfo(name, number, cardStatus);
			ManagerBoImpl managerBo = new ManagerBoImpl();
			return managerBo.queryFacilitys(info);
		}
		
		/***************权限表action****************/
		if(action.equals("getRoleList")) {
			ManagerBoImpl managerBo = new ManagerBoImpl();
			TblRole role = new TblRole();
			role.setStatus(TblRole.ABLE);
			return managerBo.getRoleList(role);
		}
		
		return "can not find any action named by " + action + "!";
		
	}
	
	
	
}
