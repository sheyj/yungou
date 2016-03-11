package com.yungou.o2o.web.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yungou.o2o.center.manager.model.SystemDict;
import com.yungou.o2o.util.CommonUtil;
import com.yungou.o2o.web.manager.SystemDictManager;
import com.yungou.o2o.web.vo.CodeDict;

/**
 * 1.tomcat容器初始化后加载些数据,如字典加载到缓存 2. 处理些公用的链接
 * 
 * @author 
 * @date 2013-07-20cc
 * @copyRight 
 */
@Controller
@RequestMapping("/initCache")
public class InitCacheController implements InitializingBean {
	
	// 加载字典
	public static Map<String, List<CodeDict>> lookupdMap = new LinkedHashMap<String, List<CodeDict>>();


	private static final Logger log = Logger.getLogger(InitCacheController.class);

	@Resource
	private SystemDictManager  systemDictManager;
	
	/**
	 * 初始化
	 */
	public void init() {
		log.info(("★★★★★★★★★★★★★★★★初始化开始★★★★★★★★★★★★★★★★"));

		// 1.字典
		reloadInitLookupdMap();
		log.info(("★★★★★★★★★★★★★★★★初始化完成★★★★★★★★★★★★★★★★"));
	}

	// 页面获得字典
	@RequestMapping(value = "/getCodeDictsList")
	@ResponseBody
	public List<CodeDict> getCodeDictsList(String lookupcode) {
		List<CodeDict> listObj = new ArrayList<CodeDict>();
		if (CommonUtil.hasValue(lookupcode) && lookupdMap.size() > 0) {
			listObj = lookupdMap.get(lookupcode);
		}
		return listObj;
	}

	
	/**
	 * 初始化加载字典数据
	 */
	private void reloadInitLookupdMap() {
		try {
			lookupdMap.clear();
			log.info(("^^^^^^初始化字典开始①^^^^^^"));
			SystemDict systemDict = new SystemDict();
			systemDict.setStatus("1");
			List<SystemDict> listDtls = systemDictManager.findByBiz(systemDict, null);
			if (CommonUtil.hasValue(listDtls)) {
				for (SystemDict vo : listDtls) {
					CodeDict codeDict = new CodeDict();
					codeDict.setCodeName(vo.getCodeName());
					codeDict.setCodeValue(vo.getCodeValue());
					List<CodeDict> tempList = null;
					if (lookupdMap.containsKey(vo.getCodeType())) {
						tempList = lookupdMap.get(vo.getCodeType());
					} else {
						tempList = new LinkedList<CodeDict>();
					}
					tempList.add(codeDict);
					lookupdMap.put(vo.getCodeType(), tempList);
				}
			}

			log.info(("^^^^^^初始化字典完成①^^^^^^Lookupcode分类个数：" + lookupdMap.size()));
		} catch (Exception e) {
			log.error("初始化字典异常",e);
		}
	}


	public void afterPropertiesSet() throws Exception {
		// TODO Auto-generated method stub
		
	}

}
