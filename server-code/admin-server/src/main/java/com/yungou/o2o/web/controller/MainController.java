package com.yungou.o2o.web.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.common.dto.MenuVo;
import com.yungou.o2o.center.manager.model.SystemUser;
import com.yungou.o2o.common.PublicConstans;
import com.yungou.o2o.util.CommonUtil;
import com.yungou.o2o.web.manager.SystemUserManager;

@Controller
@RequestMapping("/")
public class MainController {

	private static Logger logger = Logger.getLogger(MainController.class);
	
	@Resource
	private SystemUserManager systemUserManager;

	@RequestMapping("index")
	public String index() {
		return "index";
	}

	@RequestMapping(value = "/login")
	public String login(String loginName, String loginPassword, String flag, String cookieFlag, HttpServletRequest req,
			HttpServletResponse response, Model model) throws ServiceException {
		//1.判断用户名不能为空
		if (!CommonUtil.hasValue(loginName) || !CommonUtil.hasValue(loginPassword)) {
			logoutMethod(req, response);
			model.addAttribute("error", "用户名或密码为空!");
			return "login";
		}

		//2.如果用户已登录  则直接跳过登录过程
		HttpSession session = req.getSession();
		SystemUser user = (SystemUser) session.getAttribute(PublicConstans.SESSION_USER);
		if (user != null) {
			logoutMethod(req, response);
		}

		//3.验证用户名和密码
		SystemUser loginUser = new SystemUser();
		String passWord = CommonUtil.md5(loginPassword); //md5加密  
		Map<String, Object> paraMap = new HashMap<String, Object>();
		paraMap.put("loginName", loginName);
		paraMap.put("loginPassword", passWord);
		List<SystemUser> systemUserList = this.systemUserManager.findByBiz(loginUser, paraMap);
		loginUser.setLoginName(loginName);
		loginUser.setLoginPassword(passWord);
		//登录成功
		if (CommonUtil.hasValue(systemUserList)) {
			loginUser = systemUserList.get(0);
			req.getSession().setAttribute(PublicConstans.SESSION_USER, loginUser);
		} else {
			model.addAttribute("error", "用户名或密码错误!");
			return "login";
		}

		return "forward:index";
	}

	@RequestMapping(value = "/user_tree.json")
	@ResponseBody
	public List<MenuVo> userTree(HttpServletRequest req) {
		List<MenuVo> list = new ArrayList<MenuVo>();
		try {
			SystemUser loginUser =(SystemUser) req.getSession().getAttribute(PublicConstans.SESSION_USER);
			list = systemUserManager.getLoginUserMenu(loginUser.getLoginName());
		} catch (ServiceException e) {
			logger.error("获取用户菜单出错！",e);
		}
		return list;
	}

	@RequestMapping("toLogin")
	public String toLogin() {
		return "login";
	}

	@RequestMapping(value = "/center")
	public String center(HttpServletRequest req, Model model) {

		return "center";
	}

	@RequestMapping(value = "/left")
	public String left(HttpServletRequest req, Model model) {

		return "left";
	}

	@RequestMapping(value = "/left2")
	public String left2(HttpServletRequest req, Model model) {

		return "left2";
	}

	/**
	 * 注销
	 * @throws Exception 
	 */
	@RequestMapping("/logout")
	public String logout(String loginName, String loginPassword, String flag, HttpServletRequest req,
			HttpServletResponse response, Model model) {
		logoutMethod(req, response);
		return "login";

	}

	private void logoutMethod(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			//1.清除登录用户session
			session.removeAttribute(PublicConstans.SESSION_USER);
		}
	}
}
