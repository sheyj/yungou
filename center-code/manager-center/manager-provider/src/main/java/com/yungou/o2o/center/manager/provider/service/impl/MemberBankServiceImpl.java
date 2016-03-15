package com.yungou.o2o.center.manager.provider.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.yungou.o2o.center.base.BaseMapper;
import com.yungou.o2o.center.base.BaseServiceImpl;
import com.yungou.o2o.center.manager.provider.dal.database.MemberBankMapper;
import com.yungou.o2o.center.manager.service.MemberBankService;

@Service("memberBankService")
public class MemberBankServiceImpl extends BaseServiceImpl implements
		MemberBankService {
	@Resource
	private MemberBankMapper memberBankMapper;

	@Override
	public BaseMapper init() {
		return memberBankMapper;
	}

}
