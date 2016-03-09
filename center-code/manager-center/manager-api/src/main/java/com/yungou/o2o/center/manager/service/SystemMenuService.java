package com.yungou.o2o.center.manager.service;

import java.util.List;
import java.util.Map;

import com.yungou.o2o.center.manager.model.Menu;

public interface SystemMenuService {

	List<Menu> selectLoginUserMenu(Map<String, Object> params);
}
