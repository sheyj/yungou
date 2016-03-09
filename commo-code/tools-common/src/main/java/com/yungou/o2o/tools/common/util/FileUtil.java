package com.yungou.o2o.tools.common.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class FileUtil
{
    private static final Logger LOG = LoggerFactory.getLogger(FileUtil.class);
    
    public static boolean createFile(File file) throws IOException
    {
        if (!file.exists())
        {
            makeDir(file.getParentFile());
        }
        return file.createNewFile();
    }
    
    public static void makeDir(File dir)
    {
        if (!dir.getParentFile().exists())
        {
            makeDir(dir.getParentFile());
        }
        dir.mkdir();
    }
    
    /**
     * 输入流转换为本地文件
     * 
     * @param is
     * @param file
     */
    public static void saveToLocalFile(InputStream is, File file)
    {
        if (file == null)
        {
            return;
        }
        
        try
        {
            createFile(file);
        }
        catch (IOException e1)
        {
            LOG.error(e1.toString(), e1);
        }
        
        byte[] buff = new byte[1024];
        BufferedOutputStream bos = null;
        try
        {
            bos = new BufferedOutputStream(new FileOutputStream(file));
            int count;
            while (true)
            {
                count = is.read(buff);
                if (count == -1)
                {
                    break;
                }
                bos.write(buff, 0, count);
                bos.flush();
            }
        }
        catch (FileNotFoundException e)
        {
            LOG.error(e.toString(), e);
        }
        catch (IOException e)
        {
            LOG.error(e.toString(), e);
        }
        finally
        {
            if (is != null)
            {
                try
                {
                    is.close();
                }
                catch (IOException e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            if (bos != null)
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
    }
}
