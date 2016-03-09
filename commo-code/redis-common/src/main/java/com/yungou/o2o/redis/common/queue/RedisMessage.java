package com.yungou.o2o.redis.common.queue;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 序列化对象
 */
public class RedisMessage implements Serializable
{
    private static final long serialVersionUID = 8754862018585879745L;

    private static final Logger LOG = LoggerFactory.getLogger(RedisMessage.class);
    
    /**
     * 序列化对象
     */
    private Serializable serializable;
    
    /**
     * 操作类型
     */
    private Object operationType;
    
    public Serializable getSerializable()
    {
        return serializable;
    }
    
    public void setSerializable(Serializable serializable)
    {
        this.serializable = serializable;
    }
    
    public Object getOperationType()
    {
        return operationType;
    }
    
    public void setOperationType(Object operationType)
    {
        this.operationType = operationType;
    }
    
    /**
     * 序列化方法
     * @param object
     * @return
     */
    public static byte[] serialize(RedisMessage object) throws Exception
    {
        ObjectOutputStream oos = null;
        ByteArrayOutputStream baos = null;
        try
        {
            // 序列化
            baos = new ByteArrayOutputStream();
            oos = new ObjectOutputStream(baos);
            oos.writeObject(object);
            return baos.toByteArray();
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
            throw e;
        }
        finally
        {
            if (null != oos)
            {
                try
                {
                    oos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != baos)
            {
                try
                {
                    baos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
    
    /**
     * 对象反序列化
     * @param bytes
     * @return
     */
    public static RedisMessage unserialize(byte[] bytes) throws Exception
    {
        ByteArrayInputStream bais = null;
        ObjectInputStream ois = null;
        try
        {
            // 反序列化
            bais = new ByteArrayInputStream(bytes);
            ois = new ObjectInputStream(bais);
            return (RedisMessage) ois.readObject();
        }
        catch (Exception e)
        {
            LOG.error(e.toString(), e);
            throw e;
        }
        finally
        {
            if (null != ois)
            {
                try
                {
                    ois.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != bais)
            {
                try
                {
                    bais.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
}
