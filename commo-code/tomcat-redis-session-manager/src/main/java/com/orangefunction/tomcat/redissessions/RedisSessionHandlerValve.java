package com.orangefunction.tomcat.redissessions;

import org.apache.catalina.connector.Request;
import org.apache.catalina.connector.Response;
import org.apache.catalina.valves.ValveBase;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;

import javax.servlet.ServletException;

import java.io.IOException;

public class RedisSessionHandlerValve extends ValveBase
{
    private static final Log LOG = LogFactory.getLog(RedisSessionHandlerValve.class);
    
    private RedisSessionManager manager;
    
    public void setRedisSessionManager(RedisSessionManager manager)
    {
        this.manager = manager;
    }
    
    @Override
    public void invoke(Request request, Response response) throws IOException, ServletException
    {
        try
        {
            getNext().invoke(request, response);
        }
        catch (IOException ioe)
        {
            LOG.error(ioe.toString(), ioe);
            throw ioe;
        }
        catch (ServletException se)
        {
            LOG.error(se.toString(), se);
            throw se;
        }
        finally
        {
            manager.afterRequest();
        }
    }
}
