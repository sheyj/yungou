package com.yungou.o2o.center.manager.service;

import java.util.List;

import com.yungou.o2o.center.base.BaseService;
import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.manager.common.dto.MenuVo;

public interface SystemUserService extends BaseService {

	/**
	 * 获取登录用户菜单
	 * @param loginName
	 * @return
	 * @throws ServiceException
	 */
	List<MenuVo>  getLoginUserMenu(String loginName) throws ServiceException;
	
}
