package com.yungou.o2o.process.common.scheduling;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yungou.o2o.process.common.scheduling.model.LjobRunHistory;

/**
 * 定时任务状态
 * @author lin.zb
 */
public abstract class LjobRunner
{
    private static final Logger LOG = LoggerFactory.getLogger(LjobRunner.class);
    
    private DateFormat dateTimeShowFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
    /**
     * 定时任务执行日志
     * 只记录最近5次定时任务
     */
    private LinkedList<LjobRunHistory> ljobRunHistorys = new LinkedList<LjobRunHistory>();
    
    /**
     * 定时任务是否启动
     */
    private boolean isStartup = false;
    
    /**
     * 定时任务是否执行中
     */
    private boolean isRunning = false;
    
    /**
     * 定时任务启动时间
     */
    private String startupTime = null;
    
    /**
     * 定时任务执行开始时间
     */
    private String startTime = null;
    
    /**
     * 定时任务执行结束时间
     */
    private String endTime = null;
    
    /**
     * 定时任务是否正常
     * @return boolean
     */
    public boolean isAlive()
    {
        return true;
    }
    
    /**
     * 定时任务是否已经启动
     * @return boolean
     */
     public boolean isStartup()
     {
         return this.isStartup;
     }
    
     /**
      * 获取定时任务启动时间
      * @return String 格式：yyyy-MM-dd HH:mm:ss
      */
    public String getStartupTime()
    {
        return startupTime;
    }

    public LinkedList<LjobRunHistory> getLjobRunHistorys()
    {
        return ljobRunHistorys;
    }

    /**
     * 启动定时任务
     */
     public void startup()
     {
         startupTime = dateTimeShowFormat.format(new Date());
         this.isStartup = true;
     }
     
     /**
      * 关闭定时任务
      */
     public void shutdown()
     {
         startupTime = null;
         this.isStartup = false;
     }

     private synchronized void lockJob()
     {
         isRunning = true;
         startTime = dateTimeShowFormat.format(new Date());
     }
     
     private synchronized void releaseJob()
     {
         // 只记录最近5次定时任务执行日志
         if (ljobRunHistorys.size() == 5)
         {
             ljobRunHistorys.removeFirst();
         }
         
         // 更新执行日志
         endTime = dateTimeShowFormat.format(new Date());
         LjobRunHistory ljobRunHistory = new LjobRunHistory(startTime, endTime);
         ljobRunHistorys.addLast(ljobRunHistory);
         
         isRunning = false;
     }
     
     private synchronized boolean isJobLocked()
     {
         return isRunning;
     }
     
     /**
      * 是否正在执行定时任务中
      * @return boolean
      */
     public boolean isRunning()
     {
         return isJobLocked();
     }
     
     /**
      * 执行定时任务
      */
     public void doLjob()
     {
         // 判断定时是否在执行中
         if (isJobLocked())
         {
             LOG.info("当前定时任务正在运行中...");
             return;
         }
         
         // 锁定定时任务
         lockJob();
         
         try
         {
             // 执行定时任务内容
             this.ljobDetail();
         }
         catch (Exception e)
         {
             LOG.error("执行定时任务异常: " + e.toString(), e);
         }
         
         // 释放定时任务
         releaseJob();
     }
     
     /**
      * 定时任务内容
      */
     public abstract void ljobDetail();
}
