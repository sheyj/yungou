package com.yungou.o2o.center.base;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:21:00
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public interface BaseMapper {

	public int deleteByPrimaryKey(String key);

	public <ModelType> int insert(ModelType record);

	public <ModelType> int insertSelective(ModelType record);

	public <ModelType> ModelType selectByPrimaryKey(String key);

	public <ModelType> int updateByPrimaryKeySelective(ModelType record);

	public <ModelType> int updateByPrimaryKey(ModelType record);

	public <ModelType> List<ModelType> selectByParams(@Param("model") ModelType modelType,
				@Param("params") Map<String, Object> params);

	public int selectCount(@Param("params") Map<String, Object> params);

	public <ModelType> List<ModelType> selectByPage(@Param("page") SimplePage page,
			@Param("orderByField") String orderByField, @Param("orderBy") String orderBy,
			@Param("params") Map<String, Object> params);

	public <ModelType> int deleteByPrimarayKeyForModel(ModelType record);
}
