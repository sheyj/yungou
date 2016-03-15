package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.CategoryMapper;
import com.yungou.o2o.center.manager.service.CategoryService;

@Service("categoryService")
public class CategoryServiceImpl extends BaseServiceImpl implements
		CategoryService {

	@Resource
	private CategoryMapper categoryMapper;
	
	@Override
	public BaseMapper init() {
		return categoryMapper;
	}

}
