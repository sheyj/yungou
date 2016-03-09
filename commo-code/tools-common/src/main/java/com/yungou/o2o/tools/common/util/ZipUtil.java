package com.yungou.o2o.tools.common.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 文件的压缩与解压
 * 
 * @author wangc
 * 
 */
public class ZipUtil
{
    private static final Logger LOG = LoggerFactory.getLogger(ZipUtil.class);
    
    /**
     * 压缩文件
     * 
     * @param fileList 文件列表
     * @param zipFile 压缩文件
     */
    public static void doZip(List<File> fileList, File zipFile)
    {
        FileInputStream fis = null;
        FileOutputStream fos = null;
        ZipOutputStream zos = null;
        BufferedInputStream bis = null;
        OutputStream os = null;
        int count = 0;
        byte[] buff = new byte[1024];
        for (File file : fileList)
        {
            try
            {
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                
                fos = new FileOutputStream(zipFile);
                os = new BufferedOutputStream(fos);
                
                zos = new ZipOutputStream(os, Charset.defaultCharset());
                zos.putNextEntry(new ZipEntry(file.getName()));
                while ((count = bis.read(buff)) != -1)
                {
                    zos.write(buff, 0, count);
                }
            }
            catch (IOException e)
            {
                LOG.error(e.toString(), e);
            }
            finally
            {
                IOUtil.close(zos);
                IOUtil.close(os);
                IOUtil.close(fos);
                IOUtil.close(bis);
                IOUtil.close(fis);
            }
            
            try
            {
                Thread.sleep(500);
            }
            catch (InterruptedException e)
            {
            }
        }
    }
    
    /**
     * 将一个目录进行压缩
     * 
     * @param toCompressFile 要压缩的目录
     * @param outputFile 压缩后的文件(zip格式)
     */
    public static void zip(String toCompressDir, String outputFileName) throws Exception
    {
        FileOutputStream fos = new FileOutputStream(outputFileName);
        ZipOutputStream out = null;
        
        try
        {
            out = new ZipOutputStream(fos);
            zip(out, new File(toCompressDir), "");
        }
        finally
        {
            IOUtil.close(out);
            IOUtil.close(fos);
        }
    }
    
    /**
     * 将一个目录进行压缩
     * 
     * @param toCompressDir 要压缩的目录
     * @param outputFile 压缩后的文件(zip格式)
     */
    public static void zip(File toCompressDir, File outputFile)
    {
        ZipOutputStream out = null;
        try
        {
            out = new ZipOutputStream(new FileOutputStream(outputFile));
        }
        catch (FileNotFoundException e)
        {
            return;
        }
        try
        {
            zip(out, toCompressDir, "");
        }
        finally
        {
            IOUtil.close(out);
        }
    }
    
    private static void zip(ZipOutputStream out, File file, String base)
    {
        // 是目录
        if (file.isDirectory())
        {
            // 所有文件和目录
            File[] allFile = file.listFiles();
            if (isWin())
            {
                base = base.length() == 0 ? "" : base + "\\";
            }
            else
            {
                base = base.length() == 0 ? "" : base + "/";
            }
            for (File f : allFile)
            {
                zip(out, f, base + f.getName());
            }
            // 是文件
        }
        else
        {
            FileInputStream in = null;
            try
            {
                // 添加文件
                out.putNextEntry(new ZipEntry(base));
                in = new FileInputStream(file);
                IOUtil.copy(in, out);
            }
            catch (Exception e)
            {
                throw new RuntimeException(e);
            }
            finally
            {
                IOUtil.close(in);
            }
        }
    }
    
    private static boolean isWin()
    {
        return System.getProperty("os.name").startsWith("Windows");
    }
    
    public static void main(String[] arg) throws Exception
    {
        File filere = new File("D:\\resources\\test\\test.txt");
        File filedes = new File("e:/resources/test1");
        if (!filere.exists())
        {
            System.out.println("121212");
            filere.mkdir();
        }
        if (!filedes.exists())
        {
            filedes.mkdir();
        }
        IOUtil.copyFileToDirectory(filere, filedes);
        // zip("D:/apache-tomcat-7.0.37-web/wtpwebapps/portal-server/resources/test"
        // ,"D:/apache-tomcat-7.0.37-web/wtpwebapps/portal-server/resources/test1"+".zip");
    }
}
