package com.yungou.o2o.web.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yungou.o2o.center.manager.model.SystemParam;
import com.yungou.o2o.center.manager.service.SystemParamService;
import com.yungou.o2o.controller.BaseController;

/**
 * 系统参数管理
 * @author username
 * @date 2014-5-21 下午5:07:40
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Controller
@RequestMapping("/system/system_param")
public class SystemParamController extends BaseController<SystemParam> {

	@Resource
	private SystemParamService systemParamService;

	public CrudInfo init() {
		return new CrudInfo("system_param/", systemParamService);
	}

}
