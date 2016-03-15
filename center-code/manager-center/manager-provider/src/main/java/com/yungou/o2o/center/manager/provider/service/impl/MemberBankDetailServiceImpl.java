package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.MemberBankDetailMapper;
import com.yungou.o2o.center.manager.service.MemberBankDetailService;

@Service("memberBankDetailService")
public class MemberBankDetailServiceImpl extends BaseServiceImpl implements
		MemberBankDetailService {

	@Resource
	private MemberBankDetailMapper memberBankDetailMapper;

	@Override
	public BaseMapper init() {
		return memberBankDetailMapper;
	}

}
