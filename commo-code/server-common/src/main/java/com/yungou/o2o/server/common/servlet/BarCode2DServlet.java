package com.yungou.o2o.server.common.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

/**
 * @Description: 生成二维码 （QR格式）
 * @author lwei
 */
public class BarCode2DServlet extends HttpServlet
{
    private static final Logger LOG = LoggerFactory.getLogger(BarCode2DServlet.class);
    
    private static final long serialVersionUID = -9013194705601918984L;
    
    private static final String KEY = "keycode";
    
    private static final String SIZE = "msize";
    
    private static final String IMAGETYPE = "JPEG";
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        String keycode = req.getParameter(KEY);
        
        if (keycode != null && !"".equals(keycode))
        {
            ServletOutputStream stream = null;
            int size = 120;
            String msize = null;
            
            QRCodeWriter writer = null;
            BitMatrix bitMatrix = null;
            
            try
            {
                msize = req.getParameter(SIZE);
                if (msize != null && !"".equals(msize.trim()))
                {
                    try
                    {
                        size = Integer.valueOf(msize);
                    }
                    catch (NumberFormatException e)
                    {
                        LOG.error(e.toString(), e);
                    }
                }
                
                stream = resp.getOutputStream();
                writer = new QRCodeWriter();
                bitMatrix = writer.encode(keycode, BarcodeFormat.QR_CODE, size, size);
                MatrixToImageWriter.writeToStream(bitMatrix, IMAGETYPE, stream);
            }
            catch (WriterException e)
            {
                LOG.error(e.toString(), e);
            }
            finally
            {
                if (stream != null)
                {
                    stream.flush();
                    stream.close();
                }
            }
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        this.doGet(req, resp);
    }
}
