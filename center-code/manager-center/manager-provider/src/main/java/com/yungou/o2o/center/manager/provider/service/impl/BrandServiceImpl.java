package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.BrandMapper;
import com.yungou.o2o.center.manager.service.BrandService;

/**
 * 品牌
 * 
 * @author username
 * @date 2014-5-20 上午10:58:54
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@Service("brandService")
public class BrandServiceImpl extends BaseServiceImpl implements BrandService{

	@Resource
	private BrandMapper brandMapper;
	
	@Override
	public BaseMapper init() {
		return brandMapper;
	}


}
