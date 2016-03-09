package cn.wonhigh.o2o.springframework.core.io.support;

import java.io.IOException;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.exceptions.JedisConnectionException;

/**
 * 配置中心加载器
 * 
 * @author lin.zb
 * @date 2016年2月16日 下午2:04:14
 * @version 1.0.0 
 * @copyright wonhigh.net.cn 
 */
public class ConfigCenterLoader {

	private static final Logger LOG = LoggerFactory.getLogger(ConfigCenterLoader.class);

	/**
	 * 配置中心RedisIP
	 */
	private static final String CONFIG_CENTER_REDIS_IP_KEY = "config.center.redis.ip";

	/**
	 * 配置中心RedisPort
	 */
	private static final String CONFIG_CENTER_REDIS_PORT_KEY = "config.center.redis.port";

	/**
	 * 配置中心环境名
	 */
	private static final String CONFIG_CENTER_MODE_NAME = "config.center.mode.name";

	/**
	 * 配置中心项目名
	 */
	private static final String CONFIG_CENTER_PROJECT_NAME = "config.center.project.name";

	/**
	 * 配置中心公共配置
	 */
	private static final String CONFIG_CENTER_COMMON_PROJECT = "common";

	private JedisPool jedisPool = null;

	/**
	 * 从配置中心加载配置
	 * @param props
	 * @throws IOException
	 */
	public void loadPropertiesFromConfigCenter(Properties props) throws IOException {
		Set<Object> keys = props.keySet();
		String key = null;
		String configCenterRedisIP = null;
		String configCenterRedisPort = null;
		String configCenterModeName = null;
		String configCenterProjectName = null;

		for (Object objectkey : keys) {
			key = (String) objectkey;
			// 配置中心RedisIP
			if (CONFIG_CENTER_REDIS_IP_KEY.equals(key)) {
				configCenterRedisIP = props.getProperty(key);
			}
			// 配置中心项目名
			else if (CONFIG_CENTER_REDIS_PORT_KEY.equals(key)) {
				configCenterRedisPort = props.getProperty(key);
			}
			// 配置中心环境名
			else if (CONFIG_CENTER_MODE_NAME.equals(key)) {
				configCenterModeName = props.getProperty(key);
			}
			// 配置中心项目名
			else if (CONFIG_CENTER_PROJECT_NAME.equals(key)) {
				configCenterProjectName = props.getProperty(key);
			}
		}

		if (null != configCenterRedisIP && null != configCenterRedisPort && null != configCenterModeName) {
			LOG.info("开始从配置中心加载配置, 配置中心RedisIP: " + configCenterRedisIP + ", 配置中心RedisPort: " + configCenterRedisPort
					+ ", 配置中心环境名: " + configCenterModeName);

			if (null == jedisPool) {
				JedisPoolConfig jedisPoolConfig = null;
				try {
					jedisPoolConfig = new JedisPoolConfig();
					jedisPoolConfig.setTestOnBorrow(true);
					jedisPool = new JedisPool(jedisPoolConfig, configCenterRedisIP,
							Integer.valueOf(configCenterRedisPort));
				}
				catch (Exception e) {
					LOG.error("创建redis连接池失败, 配置中心RedisIP: " + configCenterRedisIP + ", 配置中心RedisPort: "
							+ configCenterRedisPort + ", 异常: " + e.toString(), e);
					return;
				}
			}

			// 加载项目配置
			List<JSONObject> jsonList = null;
			CompanyConfigManage config = null;
			String configName = null;
			String configValue = null;
			if (null != configCenterProjectName) {
				LOG.info("========================================================");
				LOG.info("开始从配置中心加载项目配置, 项目名: " + configCenterProjectName);
				jsonList = this.getConfigList(configCenterModeName + "," + configCenterProjectName);
				if (null != jsonList && jsonList.size() > 0) {
					for (JSONObject json : jsonList) {
						try {
							config = null;
							config = JSONObject.parseObject(json.toJSONString(), CompanyConfigManage.class);
						}
						catch (Exception e) {
							LOG.error(e.toString(), e);
						}

						if (null != config) {
							configName = config.getConfigName();
							configValue = config.getConfigValue();
							if (null == props.get(configName)) {
								props.put(configName, configValue);
								LOG.info(configName + "=" + configValue);
							}
							else {
								LOG.info(configName + "=" + configValue + ", 监测到本地配置文件存在该配置, 优先使用本地配置="
										+ props.get(configName));
							}
						}
					}
				}
				else {
					LOG.info("没有从配置中心加载到任何项目配置, 项目名: " + configCenterProjectName);
				}
			}

			// 加载公共配置
			LOG.info("========================================================");
			LOG.info("开始从配置中心加载公共配置");
			jsonList = this.getConfigList(configCenterModeName + "," + CONFIG_CENTER_COMMON_PROJECT);
			if (null != jsonList && jsonList.size() > 0) {
				for (JSONObject json : jsonList) {
					try {
						config = null;
						config = JSONObject.parseObject(json.toJSONString(), CompanyConfigManage.class);
					}
					catch (Exception e) {
						LOG.error(e.toString(), e);
					}

					if (null != config) {
						configName = config.getConfigName();
						configValue = config.getConfigValue();
						if (null == props.get(configName)) {
							props.put(configName, configValue);
							LOG.info(configName + "=" + configValue);
						}
						else {
							LOG.info(configName + "=" + configValue + ", 监测到本地配置文件存在该配置, 优先使用本地配置="
									+ props.get(configName));
						}
					}
				}
			}
			else {
				LOG.info("没有从配置中心加载到任何公共配置");
			}
			LOG.info("========================================================");
		}
		else {
			LOG.warn("如果需要从配置中心加载公共配置, 需要在项目工程配置文件中添加配置: 1. 配置中心RedisIP(config.center.redis.ip), 2. 配置中心RedisPort(config.center.redis.port), 3. 配置中心环境名(config.center.mode.name)");
			LOG.warn("配置中心环境名(config.center.mode.name)配置类型: develop(开发环境)/pretest(预测试环境)/test(测试环境)/user(用户测试环境)/demo(培训环境)/product(生产环境)");
			LOG.warn("如果需要从配置中心加载项目配置, 需要在项目工程配置文件中添加配置: 配置中心项目名(config.center.project.name), 否则只加载公共配置");
		}
	}

	@SuppressWarnings("unchecked")
	private List<JSONObject> getConfigList(String key) {
		Jedis jedis = null;
		String jsonList = null;
		List<JSONObject> result = null;

		try {
			jedis = jedisPool.getResource();
			jsonList = jedis.get(key);
			if (null != jsonList) {
				result = (List<JSONObject>) JSON.parse(jsonList);
			}

			return result;
		}
		catch (JedisConnectionException e) {
			if (null != jedis) {
				jedisPool.returnBrokenResource(jedis);
				jedis = null;
			}

			LOG.error("jedis.get异常：" + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("jedis.get异常：" + e.toString(), e);
			return null;
		}
		finally {
			if (null != jedis) {
				jedisPool.returnResource(jedis);
			}
		}
	}
}
