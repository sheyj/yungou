package com.yungou.o2o.web.controller;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.model.SystemUser;
import com.yungou.o2o.util.CommonUtil;
import com.yungou.o2o.util.UUIDUtil;
import com.yungou.o2o.web.manager.SystemUserManager;

/**
 * 系统用户维护
 * 
 * @author username
 * @date 2014-5-20 上午11:02:14
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Controller
@RequestMapping("/system/system_user")
public class SystemUserController  {

	@Resource
	private SystemUserManager systemUserManager;


	@RequestMapping(value = "/add")
	public ResponseEntity<SystemUser> add(SystemUser systemUser) throws ServiceException {
		if (!systemUser.getLoginPassword().equals(systemUser.getReLoginPassword())) {
			throw new ServiceException("输入密码不一致！");
		}
		//md5加密
		systemUser.setLoginPassword(CommonUtil.md5(systemUser.getLoginPassword()));
		systemUser.setUserid(UUIDUtil.getUuid());
		systemUserManager.add(systemUser);
		return new ResponseEntity<SystemUser>(systemUser, HttpStatus.OK);
	}

}
