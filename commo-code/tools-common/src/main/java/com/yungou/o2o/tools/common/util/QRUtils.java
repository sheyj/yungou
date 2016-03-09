package com.yungou.o2o.tools.common.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.Binarizer;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.EncodeHintType;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.BufferedImageLuminanceSource;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.common.HybridBinarizer;
import com.yungou.o2o.tools.common.constant.QrCodeConstant;

/**
 * @category 二维码工具类
 * @author yi.z
 * @date 2015-8-4上午10:28:02 <!-- google-zxing begin --> <dependency>
 *       <groupId>com.google.zxing</groupId> <artifactId>core</artifactId>
 *       <version>3.0.0</version> </dependency> <dependency>
 *       <groupId>com.google.zxing</groupId> <artifactId>javase</artifactId>
 *       <version>3.0.0</version> </dependency> <!-- google-zxing end -->
 */
public class QRUtils {
	/**
	 * @category 生成二维码二进制流
	 * @param jsonObj 二维码中写入的数据
	 * @param width 二维码宽
	 * @param height 二维码高
	 * @param format 图像类型
	 * @param cacheTime 二维码缓存有效时间
	 * @return
	 * @throws WriterException
	 * @throws IOException
	 */
	public static byte[] createQr(JSONObject jsonObj, int width, int height, String format, Double cacheTime)
			throws WriterException, IOException {
		// 图像token，创建的时间
		Long timestamp = new Date().getTime();
		jsonObj.put("timestamp", timestamp);
		jsonObj.put("cacheTime", cacheTime);
		String content = jsonObj.toJSONString();
		// 加密
		byte[] buteContent = AESUtil.encrypt(content, AESUtil.TOKEN);
		String encryptContent = AESUtil.parseByte2HexStr(buteContent);
		encryptContent = QrCodeConstant.QR_CODE_ORDER_TICKET + "-" + encryptContent;
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		BitMatrix bitMatrix = new MultiFormatWriter().encode(encryptContent, BarcodeFormat.QR_CODE, width, height,
				hints);// 生成矩阵
		bitMatrix = deleteWhite(bitMatrix, 10);
		ByteArrayOutputStream swapStream = null;
		byte[] data = null;

		try {
			swapStream = new ByteArrayOutputStream();
			MatrixToImageWriter.writeToStream(bitMatrix, format, swapStream);
			// 得到二进制流
			data = swapStream.toByteArray();
			return data;
		}
		catch (Exception e) {
			throw e;
		}
		finally {
			if (null != swapStream) {
				try {
					swapStream.close();
				}
				catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * @category 去除白邊
	 * @param matrix
	 * @param margin
	 * @return
	 */
	public static BitMatrix deleteWhite(BitMatrix matrix, int margin) {
		int tempM = margin * 2;
		int[] rec = matrix.getEnclosingRectangle(); // 获取二维码图案的属性
		int resWidth = rec[2] + tempM;
		int resHeight = rec[3] + tempM;
		BitMatrix resMatrix = new BitMatrix(resWidth, resHeight); // 按照自定义边框生成新的BitMatrix
		resMatrix.clear();
		for (int i = margin; i < resWidth - margin; i++) { // 循环，将二维码图案绘制到新的bitMatrix中
			for (int j = margin; j < resHeight - margin; j++) {
				if (matrix.get(i - margin + rec[0], j - margin + rec[1])) {
					resMatrix.set(i, j);
				}
			}
		}
		return resMatrix;
	}

	/**
	 * @category 解析二维码 ImageIO.read流
	 * @param bufferImage 二维码
	 * @return
	 * @throws NotFoundException
	 */
	public static String decodeQr(BufferedImage bufferImage) throws NotFoundException {
		LuminanceSource source = new BufferedImageLuminanceSource(bufferImage);
		Binarizer binarizer = new HybridBinarizer(source);
		BinaryBitmap binaryBitmap = new BinaryBitmap(binarizer);
		Map<DecodeHintType, Object> hints = new HashMap<DecodeHintType, Object>();
		hints.put(DecodeHintType.CHARACTER_SET, "UTF-8");
		// 对图像进行解码
		Result result = new MultiFormatReader().decode(binaryBitmap, hints);
		// 得到文件中的内容
		String content = result.getText();
		return content;
	}

	/**
	 * @category 判断是否已过期
	 * @param content
	 * @return
	 */
	public static boolean hasExpire(String content) {
		JSONObject jsonObj = null;
		try {
			jsonObj = JSON.parseObject(content);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		Long timestamp = jsonObj.getLong("timestamp");
		Double cacheTime = jsonObj.getDouble("cacheTime");
		Long nowTimestamp = new Date().getTime();
		Long time = nowTimestamp - timestamp;
		// 秒
		Double subTimeS = time / 1000.0;
		// 当前时间戳-缓存的时间，若大于0，则已过期
		Double expire = subTimeS - cacheTime;
		if (expire > 0) {
			return true;
		}
		return false;
	}

	/**
	 * @category 生成二维码二进制流
	 * @throws WriterException
	 * @throws IOException
	 */
	public static byte[] createQr(String url, int width, int height, String format) throws Exception {
		// 加密
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height, hints);// 生成矩阵
		bitMatrix = deleteWhite(bitMatrix, 10);
		ByteArrayOutputStream swapStream = null;
		byte[] data = null;

		try {
			swapStream = new ByteArrayOutputStream();
			MatrixToImageWriter.writeToStream(bitMatrix, format, swapStream);
			// 得到二进制流
			data = swapStream.toByteArray();
			return data;
		}
		catch (Exception e) {
			throw e;
		}
		finally {
			if (null != swapStream) {
				try {
					swapStream.close();
				}
				catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	/**
	 * @category 生成二维码二进制流 使用MD5加密
	 * @param jsonObj 二维码中写入的数据
	 * @param width 二维码宽
	 * @param height 二维码高
	 * @param format 图像类型
	 * @param cacheTime 二维码缓存有效时间
	 * @return
	 * @throws WriterException
	 * @throws IOException
	 */
	public static byte[] createQrMD5Encry(String content, int width, int height, String format) throws WriterException,
			IOException {
		content = QrCodeConstant.QR_CODE_ORDER_TICKET + "-" + content;
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
		BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, width, height, hints);// 生成矩阵
		bitMatrix = deleteWhite(bitMatrix, 10);
		ByteArrayOutputStream swapStream = null;
		byte[] data = null;

		try {
			swapStream = new ByteArrayOutputStream();
			MatrixToImageWriter.writeToStream(bitMatrix, format, swapStream);
			// 得到二进制流
			data = swapStream.toByteArray();
			return data;
		}
		catch (Exception e) {
			throw e;
		}
		finally

		{
			if (null != swapStream) {
				try {
					swapStream.close();
				}
				catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

}
