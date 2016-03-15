package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.MemberShareMapper;
import com.yungou.o2o.center.manager.service.MemberShareService;

@Service("memberShareService")
public class MemberShareServiceImpl extends BaseServiceImpl implements
		MemberShareService {

	@Resource
	private MemberShareMapper memberShareMapper;

	@Override
	public BaseMapper init() {
		return memberShareMapper;
	}

}
