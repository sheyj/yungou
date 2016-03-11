package com.syj.app.test;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-21 下午3:29:26
 * @version 0.1.0 
 * @copyright yougou.com 
 */
@RunWith(SpringJUnit4ClassRunner.class) 
@TransactionConfiguration( transactionManager = "transactionManager" , defaultRollback = true)
@ContextConfiguration(value = "/spring-app-test.xml")
public abstract class BaseTest {

}
