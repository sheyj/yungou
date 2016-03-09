package com.orangefunction.tomcat.redissessions;

import org.apache.catalina.util.CustomObjectInputStream;

import java.util.Enumeration;
import java.util.HashMap;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;

public class JavaSerializer implements Serializer
{
    private static final Log LOG = LogFactory.getLog(JavaSerializer.class);
    
    private ClassLoader loader;
    
    @Override
    public void setClassLoader(ClassLoader loader)
    {
        this.loader = loader;
    }
    
    public byte[] attributesHashFrom(RedisSession session) throws IOException
    {
        HashMap<String, Object> attributes = new HashMap<String, Object>();
        Enumeration<String> enumerator = session.getAttributeNames();
        String key = null;
        
        while (enumerator.hasMoreElements())
        {
            key = enumerator.nextElement();
            attributes.put(key, session.getAttribute(key));
        }
        
        byte[] serialized = null;
        ByteArrayOutputStream bos = null;
        BufferedOutputStream bufos = null;
        ObjectOutputStream oos = null;
        
        try
        {
            bos = new ByteArrayOutputStream();
            bufos = new BufferedOutputStream(bos);
            oos = new ObjectOutputStream(bufos);
            oos.writeUnshared(attributes);
            oos.flush();
            serialized = bos.toByteArray();
        }
        catch (IOException e)
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
            
            if (null != bufos)
            {
                try
                {
                    bufos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != bos)
            {
                try
                {
                    bos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
        
        MessageDigest digester = null;
        try
        {
            digester = MessageDigest.getInstance("MD5");
        }
        catch (NoSuchAlgorithmException e)
        {
            LOG.error("Unable to get MessageDigest instance for MD5: " + e.toString(), e);
        }
        return digester.digest(serialized);
    }
    
    @Override
    public byte[] serializeFrom(RedisSession session, SessionSerializationMetadata metadata) throws IOException
    {
        byte[] serialized = null;
        ByteArrayOutputStream bos = null;
        BufferedOutputStream bufos = null;
        ObjectOutputStream oos = null;
        
        try
        {
            bos = new ByteArrayOutputStream();
            bufos = new BufferedOutputStream(bos);
            oos = new ObjectOutputStream(bufos);

            oos.writeObject(metadata);
            session.writeObjectData(oos);
            oos.flush();
            serialized = bos.toByteArray();
        }
        catch (IOException e)
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
            
            if (null != bufos)
            {
                try
                {
                    bufos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != bos)
            {
                try
                {
                    bos.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
        
        return serialized;
    }
    
    @Override
    public void deserializeInto(byte[] data, RedisSession session, SessionSerializationMetadata metadata) throws IOException,
            ClassNotFoundException
    {
        ByteArrayInputStream bis = null;
        BufferedInputStream bufis = null;
        ObjectInputStream ois = null;
        SessionSerializationMetadata serializedMetadata = null;
        
        try
        {
            bis = new ByteArrayInputStream(data);
            bufis = new BufferedInputStream(bis);
            ois = new CustomObjectInputStream(bufis, loader);
            
            serializedMetadata = (SessionSerializationMetadata) ois.readObject();
            metadata.copyFieldsFrom(serializedMetadata);
            session.readObjectData(ois);
        }
        catch (IOException e)
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
            
            if (null != bufis)
            {
                try
                {
                    bufis.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != bis)
            {
                try
                {
                    bis.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
    }
}
