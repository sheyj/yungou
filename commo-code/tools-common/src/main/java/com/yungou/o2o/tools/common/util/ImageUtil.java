package com.yungou.o2o.tools.common.util;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 图像工具类
 */
public final class ImageUtil
{
    private static final Logger LOG = LoggerFactory.getLogger(ImageUtil.class);
    
    /** 图片格式：JPG */
    public static final String PICTRUE_FORMATE_JPG = "jpg";
    /** 默认字体名称：宋体 */
    public static final String DEFAULT_FONT_NAME = "微软雅黑";
    /** 默认字体样式：粗体 */
    public static final int DEFAULT_FONT_STYLE = Font.PLAIN;
    /** 默认字体大小：20px */
    public static final int DEFAULT_FONT_SIZE = 18;
    
    /**
     * 将图片缩小倍数
     * @param im 原始图像
     * @param resizeTimes 需要缩小的倍数，缩小2倍为原来的1/2 ，这个数值越大，返回的图片越小
     * @return 返回处理后的图像
     */
    public static BufferedImage resizeImage(BufferedImage im, float resizeTimes)
    {
        /* 原始图像的宽度和高度 */
        int width = im.getWidth();
        int height = im.getHeight();
        
        /* 调整后的图片的宽度和高度 */
        int toWidth = (int) (Float.parseFloat(String.valueOf(width)) / resizeTimes);
        int toHeight = (int) (Float.parseFloat(String.valueOf(height)) / resizeTimes);
        
        /* 新生成结果图片 */
        BufferedImage result = new BufferedImage(toWidth, toHeight, BufferedImage.TYPE_INT_RGB);
        
        result.getGraphics().drawImage(im.getScaledInstance(toWidth, toHeight, java.awt.Image.SCALE_SMOOTH), 0, 0, null);
        return result;
    }
    
    /**
     * 将图片按照指定的尺寸压缩 返回字节数组
     * @param im 原始图像
     * @param width 图片压缩后的宽
     * @param height 图片压缩后的高
     * @return
     */
    public static BufferedImage resizeImage(BufferedImage im, int width, int height)
    {
        /* 新生成结果图片 */
        BufferedImage result = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        result.getGraphics().drawImage(im.getScaledInstance(width, height, java.awt.Image.SCALE_SMOOTH), 0, 0, null);
        return result;
    }
    
    /**
     * 下载图片
     * @param downloadurl
     * @return
     */
    public static BufferedImage downloadImage(String downloadurl)
    {
        URL url = null;
        HttpURLConnection conn = null;
        // 获取图片数据输入流
        InputStream inStream = null;
        
        try
        {
            url = new URL(downloadurl);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(5 * 1000);
            inStream = conn.getInputStream();
            return ImageIO.read(inStream);
        }
        catch (Exception e)
        {
            LOG.error("图片下载异常: " + e.toString(), e);
            return null;
        }
        finally
        {
            if (null != inStream)
            {
                try
                {
                    inStream.close();
                }
                catch (Exception e)
                {
                    LOG.error(e.toString(), e);
                }
            }
            
            if (null != conn)
            {
                conn.disconnect();
            }
        }
    }
    
    /**
     * 将图片转换为byte[] 数组
     * @param bufferedImage
     * @param suffixName
     * @return
     */
    public static byte[] toByteImage(BufferedImage bufferedImage, String suffixName)
    {
        ByteArrayOutputStream outImg = null;
        
        try
        {
            outImg = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, suffixName, outImg);
            return outImg.toByteArray();
        }
        catch (Exception e)
        {
            LOG.error("获取图片字节流异常: " + e.toString(), e);
            return null;
        }
        finally
        {
            if (null != outImg)
            {
                try
                {
                    outImg.close();
                }
                catch (Exception e)
                {
                    LOG.error(e.toString(), e);
                }
            }
        }
    }

    /**
     * 默认格式添加文字
     * 
     * @param targetFile
     *            图片文件
     * @param text
     *            需写入的图片文字
     * @throws IOException
     */
    public static void pressText(File targetFile, String text) throws IOException {
        pressText(targetFile, text, DEFAULT_FONT_NAME, DEFAULT_FONT_STYLE, DEFAULT_FONT_SIZE, Color.BLACK, -1, 0, 1f);
    }

    /**
     * 图片添加文字
     * 
     * @param targetFile
     *            目标图片路径
     * @param pressText
     *            水印文字
     * @param fontName
     *            字体名称
     * @param fontStyle
     *            字体样式
     * @param fontSize
     *            字体大小
     * @param color
     *            字体颜色
     * @param x
     *            水印文字距离目标图片左侧的偏移量，如果x<0, 则在正中间
     * @param y
     *            水印文字距离目标图片上侧的偏移量，如果y<0, 则在正中间
     * @param alpha
     *            透明度(0.0 -- 1.0, 0.0为完全透明，1.0为完全不透明)
     * @throws IOException
     */
    public static void pressText(File targetFile, String pressText, String fontName, int fontStyle, int fontSize,
            Color color, int x, int y, float alpha) throws IOException {
        Image image = ImageIO.read(targetFile);
        int width = image.getWidth(null);
        // 图片高度
        int height = image.getHeight(null);
        //如果文字的宽度比图片还要长,则要换行显示
        int width_1 = fontSize * getLength(pressText);
        // 文字高度
        int height_1 = fontSize;
        int number = 0;
        int rowNumber = 0;
        
        if(width != 0){
            number = width_1%width ==0 ? width_1/width : width_1/width +1;
            if(number==0){
                number = 1;
            }
        }
        String[] words = new String[number];
        int tempWidth = width_1;
        String tempStr = pressText;
        if(number>0){
            for(int i = 0;i<number;i++){
                if(tempWidth>width){
                    tempWidth = tempWidth - width;
                    if(i==0){
                        String strText = tempStr.substring(0, (width)/fontSize);
                        int length = 0;
                        for (int k = 0; k < strText.length(); k++) {
                            if (String.valueOf(strText.charAt(k)).getBytes().length == 1) {
                                length++;
                            }
                        }
                        if(length>5){
                            words[i] = tempStr.substring(0, (width + length*2)/fontSize +1);
                            tempStr = tempStr.substring((width + length*2)/fontSize+1);
                        }else{
                            words[i] = tempStr.substring(0, (width)/fontSize);
                            tempStr = tempStr.substring((width)/fontSize);
                        }
                    }else{
                        words[i] = tempStr.substring(0, (width-48)/fontSize);
                        tempStr = tempStr.substring((width-48)/fontSize);
                    }
                    rowNumber ++;
                }else{
                    words[i] = tempStr;
                    rowNumber ++;
                }
            }
        }
        //加30表示边框留一点空白
        int newWidth = width+30;
        int newheight = height + rowNumber*fontSize + 30;
        height_1 = rowNumber*fontSize + 30;
        BufferedImage bufferedImage = new BufferedImage(newWidth, newheight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g =  bufferedImage.createGraphics();
        g.setBackground(Color.WHITE);
        g.clearRect(0, 0, newWidth, newheight);
        g.drawImage(image, 15, 10, width, height,Color.WHITE, null);
        g.setFont(new Font(fontName, fontStyle, fontSize));
        g.setColor(color);
        g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));
        
        int widthDiff = width - fontSize * getLength(pressText);
        int heightDiff = height + height_1;
        
        //加6表示去掉边框的距离和图片对齐显示文字
        if (x < 0) {
            if(widthDiff<0){
                x = 30+6;
            }else{
                x = widthDiff/2;
            }
        } else if (x > widthDiff) {
            if(widthDiff<0){
                x = 30+6;
            }else{
                x = widthDiff;
            }
        }else{
            x = 15;
        }
        if (y <= 0) {
            y = height + fontSize;
        } else if (y > heightDiff) {
            if(rowNumber>1){
                y = height + fontSize;
            }else{
                y = heightDiff;
            }
        }else{
            y = heightDiff;
        }
        for(int j=0;j<rowNumber;j++){
            g.drawString(words[j], x, y);
            y = y + fontSize;
        }
        g.dispose();

        ImageIO.write(bufferedImage, PICTRUE_FORMATE_JPG, targetFile);
    }

    /**
     * 获取字符长度，一个汉字作为 1 个字符, 一个英文字母作为 0.5 个字符
     * 
     * @param text
     * @return 字符长度，如：text="中国",返回 2；text="test",返回 2；text="中国ABC",返回 4.
     */
    private static int getLength(String text) {
        int textLength = text.length();
        int length = textLength;
        for (int i = 0; i < textLength; i++) {
            if (String.valueOf(text.charAt(i)).getBytes().length > 1) {
                length = length+2;
            }
        }
        return ((length % 3) == 0) ? length / 3 : (length / 3) + 1;
    }
}
