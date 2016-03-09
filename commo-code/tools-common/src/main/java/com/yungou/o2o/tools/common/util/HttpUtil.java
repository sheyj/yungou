package com.yungou.o2o.tools.common.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * HTTP请求工具类.
 * 
 * @author zhang.dk
 * @date 2014-6-7 上午11:02:17
 * @version 0.1.0
 * @copyright yougou.com
 */
public final class HttpUtil {
	private static final Logger LOG = LoggerFactory.getLogger(HttpUtil.class);

	private static final String UFT_8 = "UTF-8";

	/**
	 * 下载网络文件保存至本地
	 * 
	 * @param url 网络资源地址
	 * @param file 本地文件
	 * @return
	 */
	public static boolean download(String url, File file) {
		LOG.debug("下载网络文件请求：url={}, filePath={}", url, file.getPath());
		long beg = System.currentTimeMillis();
		HttpURLConnection connection = null;

		try {
			connection = buildConnection(url);
			FileUtil.saveToLocalFile(connection.getInputStream(), file);
			LOG.debug("下载网络文件耗时：{}", System.currentTimeMillis() - beg);
			return true;
		}
		catch (MalformedURLException e) {
			LOG.error("下载网络文件时出错: " + e.toString(), e);
			return false;
		}
		catch (IOException e) {
			LOG.error("下载网络文件时出错: " + e.toString(), e);
			return false;
		}
		catch (Exception e) {
			LOG.error("下载网络文件时出错: " + e.toString(), e);
			return false;
		}
		finally {
			if (null != connection) {
				connection.disconnect();
			}
		}
	}

	/**
	 * HTTP Post请求
	 * @param requestURL
	 * @param params
	 * @return
	 */
	public static String httpPost(String requestURL, Map<String, String> params) {
		LOG.info("POST 请求路径：url={}，content={}", requestURL, params);
		HttpURLConnection connection = null;

		try {
			connection = buildConnection(requestURL);
			configConnection(connection, RequestMethod.POST);
			connection.connect();
			writeContent(params, connection);
			return readResponseAndCloseResource(connection);
		}
		catch (IOException e) {
			LOG.error("发送HTTP POST请求时出错" + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("发送HTTP POST请求时出错: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != connection) {
				connection.disconnect();
			}
		}
	}

	/**
	 * HTTP Get请求
	 * @param requestURL
	 * @return
	 */
	public static String httpGet(String requestURL) {
		LOG.info("GET 请求路径：url={}", requestURL);
		HttpURLConnection connection = null;

		try {
			connection = buildConnection(requestURL);
			configConnection(connection, RequestMethod.GET);
			connection.connect();
			return readResponseAndCloseResource(connection);
		}
		catch (IOException e) {
			LOG.error("发送HTTP GET请求时出错: " + e.toString(), e);
			return null;
		}
		catch (Exception e) {
			LOG.error("发送HTTP GET请求时出错: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != connection) {
				connection.disconnect();
			}
		}
	}

	private static HttpURLConnection buildConnection(String requestURL) throws MalformedURLException, IOException {
		URL url = new URL(requestURL);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		return connection;
	}

	private static void configConnection(HttpURLConnection connection, RequestMethod method) throws ProtocolException {
		connection.setConnectTimeout(3000);
		connection.setReadTimeout(5000);
		connection.setDoOutput(true);
		connection.setDoInput(true);
		connection.setRequestMethod(method.toString());
		connection.setUseCaches(false);
		connection.setInstanceFollowRedirects(true);
		connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
	}

	private static String readResponseAndCloseResource(HttpURLConnection connection) throws IOException {
		StringBuilder buff = new StringBuilder();
		String line = null;
		InputStreamReader inputStreamReader = null;
		BufferedReader bufferedReader = null;

		try {
			inputStreamReader = new InputStreamReader(connection.getInputStream());
			bufferedReader = new BufferedReader(inputStreamReader);
			while ((line = bufferedReader.readLine()) != null) {
				buff.append(line);
			}
		}
		finally {
			if (null != bufferedReader) {
				try {
					bufferedReader.close();
				}
				catch (Exception e) {
					LOG.error(e.toString());
				}
			}

			if (null != inputStreamReader) {
				try {
					inputStreamReader.close();
				}
				catch (Exception e) {
					LOG.error(e.toString());
				}
			}
		}

		return buff.toString();
	}

	private static void writeContent(Map<String, String> params, HttpURLConnection connection) throws IOException,
			UnsupportedEncodingException {
		DataOutputStream out = new DataOutputStream(connection.getOutputStream());
		StringBuilder buff = new StringBuilder();
		Set<String> keys = params.keySet();
		boolean after = false;
		for (String key : keys) {
			if (after) {
				buff.append("&");
			}
			else {
				after = true;
			}
			buff.append(key).append("=").append(URLEncoder.encode(params.get(key), UFT_8));
		}
		LOG.info("POST请求的主体内容：{}", buff.toString());
		out.writeBytes(buff.toString());
		out.flush();
		out.close();
	}

	public static String httpsGet(String requestURL) {
		return httpsRequest(requestURL, RequestMethod.GET, null);
	}

	public static String httpsPost(String requestURL, String outputData) {
		return httpsRequest(requestURL, RequestMethod.POST, outputData);
	}

	public static String httpsRequest(String requestURL, RequestMethod method, String outputData) {
		LOG.info("请求路径URL：{},请求方法：{},请求参数：{}", requestURL, method, outputData);
		SSLSocketFactory factory = null;
		URL url = null;
		HttpsURLConnection connection = null;
		InputStream input = null;
		InputStreamReader reader = null;
		BufferedReader bufferedReader = null;
		String line = null;
		StringBuilder buff = null;

		if (null != requestURL && null != outputData) {
			if (requestURL.endsWith("?")) {
				requestURL = requestURL + outputData;
			}
			else if (requestURL.contains("?")) {
				requestURL = requestURL + "&" + outputData;
			}
			else {
				requestURL = requestURL + "?" + outputData;
			}
		}

		try {
			factory = buildSSLSocketFactory();

			url = new URL(requestURL);
			connection = (HttpsURLConnection) url.openConnection();

			configConnectionProperties(method, factory, connection);

			if (method == RequestMethod.GET) {
				connection.connect();
			}

			input = connection.getInputStream();
			reader = new InputStreamReader(input, UFT_8);
			bufferedReader = new BufferedReader(reader);
			if (HttpsURLConnection.HTTP_OK == connection.getResponseCode()) {
				buff = new StringBuilder();
				while ((line = bufferedReader.readLine()) != null) {
					buff.append(line);
				}
				return buff.toString();
			}
			else {
				return null;
			}
		}
		catch (Exception e) {
			LOG.error("HTTPS Request error: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != bufferedReader) {
				try {
					bufferedReader.close();
				}
				catch (IOException e) {
					LOG.error(e.toString());
				}
			}

			if (null != reader) {
				try {
					reader.close();
				}
				catch (IOException e) {
					LOG.error(e.toString());
				}
			}

			if (null != input) {
				try {
					input.close();
				}
				catch (IOException e) {
					LOG.error(e.toString());
				}
			}

			if (null != connection) {
				connection.disconnect();
			}
		}
	}

	private static void configConnectionProperties(RequestMethod method, SSLSocketFactory factory,
			HttpsURLConnection connect) throws ProtocolException {
		connect.setSSLSocketFactory(factory);
		connect.setConnectTimeout(3000);
		connect.setReadTimeout(5000);
		connect.setDoOutput(true);
		connect.setDoInput(true);
		connect.setUseCaches(false);
		connect.setRequestMethod(method.toString());
	}

	private static SSLSocketFactory buildSSLSocketFactory() throws NoSuchAlgorithmException, NoSuchProviderException,
			KeyManagementException {
		TrustManager[] trustManagers = { new X509TrustManager() };
		SSLContext context = SSLContext.getInstance("SSL", "SunJSSE");
		context.init(null, trustManagers, new SecureRandom());
		SSLSocketFactory factory = context.getSocketFactory();
		return factory;
	}

	public static String httpUpload(String requestURL, InputStream input, String fileName) {
		StringBuilder buff = null;
		HttpURLConnection connect = null;
		OutputStream output = null;
		InputStreamReader inputStreamReader = null;
		BufferedReader reader = null;
		String line = null;

		try {
			connect = buildConnection(requestURL);
			String boundary = "----------" + System.currentTimeMillis();
			configConnectionProperties(connect, boundary);
			output = new DataOutputStream(connect.getOutputStream());

			writeHead(fileName, boundary, output);
			writeBody(input, output);
			writeFoot(boundary, output);
			output.flush();

			buff = new StringBuilder();
			inputStreamReader = new InputStreamReader(connect.getInputStream());
			reader = new BufferedReader(inputStreamReader);
			while ((line = reader.readLine()) != null) {
				buff.append(line);
			}

			return buff.toString();
		}
		catch (IOException e) {
			LOG.error("上传文件出错: " + e.toString(), e);
			return null;
		}
		finally {
			if (null != reader) {
				try {
					reader.close();
				}
				catch (IOException e) {
					LOG.error(e.toString());
				}
			}

			if (null != inputStreamReader) {
				try {
					inputStreamReader.close();
				}
				catch (IOException e) {
					LOG.error(e.toString());
				}
			}

			if (null != output) {
				try {
					output.close();
				}
				catch (IOException e) {
					LOG.error(e.toString());
				}
			}

			if (null != connect) {
				connect.disconnect();
			}
		}
	}

	private static void writeFoot(String boundary, OutputStream output) throws UnsupportedEncodingException,
			IOException {
		byte[] foot = ("\r\n--" + boundary + "--\r\n").getBytes("utf-8");// 定义最后数据分隔线
		output.write(foot);
	}

	private static void writeBody(InputStream input, OutputStream output) throws IOException {
		DataInputStream in = null;
		try {
			in = new DataInputStream(input);
			int bytes = 0;
			byte[] bufferOut = new byte[1024];
			while ((bytes = in.read(bufferOut)) != -1) {
				output.write(bufferOut, 0, bytes);
			}
		}
		finally {
			if (in != null) {
				in.close();
			}
		}
	}

	private static void writeHead(String fileName, String boundary, OutputStream output)
			throws UnsupportedEncodingException, IOException {
		StringBuilder buff = new StringBuilder();
		buff.append("--");
		buff.append(boundary);
		buff.append("\r\n");
		buff.append("Content-Disposition: form-data;name=\"media\";filename=\"" + fileName + "\"\r\n");
		buff.append("Content-Type: image/jpeg\r\n\r\n");

		byte[] head = buff.toString().getBytes(UFT_8);
		output.write(head);
	}

	private static void configConnectionProperties(HttpURLConnection connect, String boundary) throws ProtocolException {
		connect.setConnectTimeout(3000);
		connect.setReadTimeout(5000);
		connect.setRequestMethod(RequestMethod.POST.toString());
		connect.setDoInput(true);
		connect.setDoOutput(true);
		connect.setRequestProperty("Charset", UFT_8);
		connect.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
	}

	/**
	 * modify by yu.jz 2014-7-11 14:55:47
	 * */
	public static byte[] readInputStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outStream = null;
		byte[] buffer = new byte[1024];
		int len = 0;

		try {
			outStream = new ByteArrayOutputStream();
			while ((len = inStream.read(buffer)) != -1) {
				// 用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
				outStream.write(buffer, 0, len);
			}
			return outStream.toByteArray();
		}
		finally {
			if (null != outStream) {
				try {
					outStream.close();
				}
				catch (Exception e) {
					LOG.error(e.toString());
				}
			}
		}
	}

	public static enum RequestMethod {
		GET, POST;
	}

	/**
	 * 解析出url参数中的键值对
	 * @param url
	 * @return
	 */
	public static Map<String, String> getUrlRequestParamMap(String url) {
		Map<String, String> mapRequest = new HashMap<String, String>();
		String[] arrSplit = null;
		String strUrlParam = splitUrlRequestParams(url);
		if (null == strUrlParam) {
			return mapRequest;
		}

		// 每个键值为一组
		arrSplit = strUrlParam.split("[&]");
		String[] arrSplitEqual = null;
		for (String strSplit : arrSplit) {
			arrSplitEqual = strSplit.split("[=]");

			// 解析出键值
			if (arrSplitEqual.length > 1) {
				// 正确解析
				mapRequest.put(arrSplitEqual[0], arrSplitEqual[1]);
			}
			else {
				if (arrSplitEqual[0] != "") {
					// 只有参数没有值，不加入
					mapRequest.put(arrSplitEqual[0], null);
				}
			}
		}

		return mapRequest;
	}

	/**
	 * 获取url，去除参数部分
	 * @param url
	 * @return
	 */
	public static String splitUrl(String url) {
		if (null != url && url.length() > 1) {
			String[] arrSplit = url.split("[?]");
			return arrSplit[0];
		}

		return null;
	}

	/**
	 * 去掉url中的路径，留下请求参数部分
	 * @param url
	 * @return
	 */
	private static String splitUrlRequestParams(String url) {
		String strAllParam = null;
		if (null != url && url.length() > 1) {
			String[] arrSplit = url.split("[?]");
			if (null != arrSplit && arrSplit.length > 1) {
				if (null != arrSplit[1]) {
					strAllParam = arrSplit[1];
					arrSplit = strAllParam.split("[ ]");
					if (null != arrSplit && arrSplit.length > 1) {
						strAllParam = arrSplit[0];
					}
				}
			}
		}

		return strAllParam;
	}

	/**
	 * 下载并保存文件
	 * @param urlString 下载url
	 * @param filename 文件名
	 * @param savePath 保存地址
	 * @throws Exception 
	 */
	public static void download(String urlString, String filename, String savePath) throws Exception {
		URL url = null;
		URLConnection con = null;
		InputStream is = null;
		byte[] bs = new byte[1024];
		int len = -1;
		File sf = null;
		OutputStream os = null;

		try {
			url = new URL(urlString);
			con = url.openConnection();

			//设置请求超时为5s
			con.setConnectTimeout(5 * 1000);
			is = con.getInputStream();

			// 输出的文件流
			sf = new File(savePath);
			if (!sf.exists()) {
				sf.mkdirs();
			}

			// 开始读取
			os = new FileOutputStream(sf.getPath() + "\\" + filename);
			while ((len = is.read(bs)) != -1) {
				os.write(bs, 0, len);
			}
		}
		catch (Exception e) {
			LOG.error(e.toString(), e);
			throw e;
		}
		finally {
			if (null != os) {
				try {
					os.close();
				}
				catch (Exception e) {
					LOG.error(e.toString(), e);
				}
			}

			if (null != is) {
				try {
					is.close();
				}
				catch (Exception e) {
					LOG.error(e.toString(), e);
				}
			}
		}
	}

	/**
	 * 下载文件
	 * @param urlString 下载url
	 * @return byte[]
	 * @throws Exception
	 */
	public static byte[] download2byte(String urlString) throws Exception {
		URL url = null;
		URLConnection con = null;
		InputStream is = null;
		ByteArrayOutputStream outStream = null;
		byte[] data = new byte[1024];
		int count = 0;

		try {
			url = new URL(urlString);
			con = url.openConnection();

			//设置请求超时为10s
			con.setConnectTimeout(10 * 1000);
			is = con.getInputStream();

			// 开始读取
			outStream = new ByteArrayOutputStream();
			while ((count = is.read(data, 0, data.length)) != -1) {
				outStream.write(data, 0, count);
			}

			return outStream.toByteArray();
		}
		catch (Exception e) {
			LOG.error(e.toString(), e);
			throw e;
		}
		finally {
			if (null != is) {
				try {
					is.close();
				}
				catch (Exception e) {
					LOG.error(e.toString(), e);
				}
			}
		}
	}
}

class X509TrustManager implements javax.net.ssl.X509TrustManager {
	@Override
	public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
	}

	@Override
	public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
	}

	@Override
	public X509Certificate[] getAcceptedIssuers() {
		return null;
	}
}