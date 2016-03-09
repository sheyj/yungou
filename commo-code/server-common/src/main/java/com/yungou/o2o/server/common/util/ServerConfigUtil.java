package com.yungou.o2o.server.common.util;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.PropertyResourceConfigurer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.core.io.support.PropertiesLoaderSupport;

/**
 * 配置文件管理
 */
public final class ServerConfigUtil implements ApplicationContextAware
{
    private static final Logger LOG = LoggerFactory.getLogger(ServerConfigUtil.class);
    
    private static final String SERVER_URL_REG = "^http\\:\\/\\/([a-z0-9\\.\\-]+[\\:]{0,1}[0-9]*)\\/(.+)";
    
    private static final Pattern SERVER_URL_PATTERN = Pattern.compile(SERVER_URL_REG);
    
    private static final String SERVER_URL_MAPPER = "server.url.mapper.";
    
    private static Map<String, String> serverMapper = new HashMap<String, String>();
	
	/**
	 * 容器
	 */
	private static AbstractApplicationContext abstractContext = null;
	
	/**
	 * 初始化扫描加载配置文件中的server配置
	 */
	public static void init()
	{
	    String[] postProcessorNames = null;
	    BeanFactoryPostProcessor beanProcessor = null;
	    PropertyResourceConfigurer propertyResourceConfigurer = null;
	    Method mergeProperties = null;
	    Properties props = null;
	    Method convertProperties = null;
	    Set<Object> keys = null;
	    String key = null;
	    String serverName = null;
	    String serverUrl = null;
	    
        try
        {
           postProcessorNames = abstractContext.getBeanNamesForType(BeanFactoryPostProcessor.class, true, true);
            
            for (String ppName : postProcessorNames)
            {
                beanProcessor = abstractContext.getBean(ppName, BeanFactoryPostProcessor.class);
                if (beanProcessor instanceof PropertyResourceConfigurer)
                {
                    propertyResourceConfigurer = (PropertyResourceConfigurer) beanProcessor;
                    mergeProperties = PropertiesLoaderSupport.class.getDeclaredMethod("mergeProperties");
                    mergeProperties.setAccessible(true);
                    props = (Properties) mergeProperties.invoke(propertyResourceConfigurer);
                    convertProperties = PropertyResourceConfigurer.class.getDeclaredMethod("convertProperties", Properties.class);
                    convertProperties.setAccessible(true);
                    convertProperties.invoke(propertyResourceConfigurer, props);
                    
                    keys = props.keySet();
                    for (Object objectkey : keys)
                    {
                        key = (String) objectkey;
                        if (null != key && key.startsWith(SERVER_URL_MAPPER))
                        {
                            serverName = key.substring(18);
                            serverUrl = checkAndFormatUrl(props.getProperty(key), serverName);
                            LOG.info("扫描到server配置, 项目名: " + serverName + ", 项目访问路径: " + serverUrl);
                            
                            serverMapper.put(serverName, serverUrl);
                        }
                    }
                }
            }
        }
        catch (Exception e)
        {
            LOG.error("扫描server配置异常: " + e.toString(), e);
            throw new RuntimeException(e);
        }
	}
	
	/**
	 * 获取服务器Map
	 * @return Map<String, String> key:服务器名  value:服务器访问地址
	 */
	public static Map<String, String> getServerMapper()
    {
        return serverMapper;
    }

	/**
	 * 设置服务器Map
	 * @param serverMapper Map<String, String> key:服务器名  value:服务器访问地址
	 */
    public static void setServerMapper(Map<String, String> serverMapper)
    {
        ServerConfigUtil.serverMapper = serverMapper;
    }

    /**
	 * 获取服务器访问URL
	 * @param serverName 访问服务器部署名
	 * @return String 服务器访问URL
	 */
	public static String getServerUrl(String serverName)
	{
	    if (null == serverName)
	    {
	        return null;
	    }
	    
	    return serverMapper.get(serverName);
	}


    /**
     * 格式化路径
     * @param url
     * @return String
     * @throws Exception 
     */
    private static String checkAndFormatUrl(String url, String serverName) throws Exception
    {
        // 不能为空
        if (null == url || "".equals(url.trim()))
        {
            throw new Exception(serverName + "访问地址格式不正确, 正确格式: http://{host}[:port]/{serverName}, [:port]为可选配置");
        }
        
        // 正则校验访问地址
        String tempUrl = url.toLowerCase(Locale.getDefault());
        Matcher matcher = SERVER_URL_PATTERN.matcher(tempUrl);
        if (!matcher.matches())
        {
            throw new Exception(serverName + "访问地址格式不正确, 正确格式: http://{host}[:port]/{serverName}, [:port]为可选配置");
        }
        
        String[] args = matcher.group(1).split(":");
        if (args.length == 2 && (null == args[1] || "".equals(args[1].trim())))
        {
            throw new Exception(serverName + "访问地址格式不正确, 正确格式: http://{host}[:port]/{serverName}, [:port]为可选配置");
        }
        
        // 去除访问地址最后的'/'
        if (url.endsWith("/"))
        {
            url = url.substring(0, url.length() - 1);
        }
        
        return url;
    }
    
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException
    {
        ServerConfigUtil.abstractContext = (AbstractApplicationContext) applicationContext;
    }
}
