package com.yungou.o2o.util;

import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Random;
import java.util.ResourceBundle;
import java.util.UUID;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.Cell;

/**
 * 通用util工具类
 * 
 * @ClassName: CommonUtil
 * @Description: 
 * @author zhu.b
 * @date 2011-5-23 下午09:51:47
 */
public class CommonUtil {

	public static String getRound(double d) {
		if (d == 0) {
			return "0";
		}
		DecimalFormat df = new DecimalFormat("0.00");
		return df.format(d);
	}

	private static String replace(String str, String replace, String replaceStr) {
		if (str != null) {
			int i = str.indexOf(replace);
			int j = 0;
			while (i != -1) {
				j++;
				str = str.substring(0, i) + replaceStr + str.substring(i + replace.length());
				i = str.indexOf(replace, i + replaceStr.length());
			}
		}
		return str;
	}

	public static String htmlType(String s) {
		if (s == null || s.toLowerCase().equals("null")) {
			return "";
		}
		s = replace(s, " ", "&nbsp;");
		s = replace(s, "\r\n", "<br>");
		return s;
	}

	/**
	 * 判断该字符串是否为中文
	 * 
	 * @param str
	 *            String 输入字符
	 * @return boolean
	 */
	public static boolean IsChinese(String str) {
		if (str.matches("[\u4e00-\u9fa5]+")) {
			return true;
		} else {
			return false;
		}
	}

	public static boolean isGB(String str) {
		if (null == str) {
			return false;
		}
		if ("".equals( str.trim())) {
			return false;
		}
		byte[] bytes = str.getBytes();
		if (bytes.length < 2) {
			return false;
		}
		byte aa = (byte) 0xB0;
		byte bb = (byte) 0xF7;
		byte cc = (byte) 0xA1;
		byte dd = (byte) 0xFE;
		if (bytes[0] >= aa && bytes[0] <= bb) {
			if (bytes[1] < cc || bytes[1] > dd) {
				return false;
			}
			return true;
		}
		return false;
	}

	public static boolean isBig5(String str) {
		if (null == str) {
			return false;
		}
		if ("".equals( str.trim())) {
			return false;
		}
		byte[] bytes = str.getBytes();
		if (bytes.length < 2) {
			return false;
		}
		byte aa = (byte) 0xB0;
		byte bb = (byte) 0xF7;
		byte cc = (byte) 0xA1;
		byte dd = (byte) 0xFE;
		if (bytes[0] >= aa && bytes[0] <= bb) {
			if (bytes[1] < cc || bytes[1] > dd) {
				return true;
			}
			return false;
		}
		return false;
	}

	/**
	 * 对字符串进行MD5加密
	 * 
	 * @param plainText
	 *            String
	 * @return String
	 */
	public static String md5(String plainText) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(plainText.getBytes());
			byte b[] = md.digest();
			int i;
			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0) {
					i += 256;
				}
				if (i < 16) {
					buf.append("0");
				}
				buf.append(Integer.toHexString(i));
			}
			return buf.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return "";
		}
	}

	/** 将输入字符串转化为utf8编码,并返回该编码的字符串 */
	public static String changeEncode(String in) {
		String s = null;
		byte temp[];
		if (in == null) {
			System.out.println("Warn:Chinese null founded!");
			return new String("");
		}
		try {
			temp = in.getBytes("utf8");
			s = new String(temp);
		} catch (UnsupportedEncodingException e) {
			System.out.println(e.toString());
		}
		return s;
	}

	/** 根据时间生成唯一编号 */
	public static String buildNumber(int length) {
		long time = System.currentTimeMillis();

		Random random = new Random();
		StringBuffer buffer = new StringBuffer().append(time);

		String result = "";

		if (buffer.length() >= length) {
			buffer = new StringBuffer();
			for (int i = 0; i < length; i++) {
				buffer.append(random.nextInt(9));
			}
		} else {
			for (int i = 0; i < (length - buffer.length()); i++) {
				buffer.append(random.nextInt(9));
			}
		}

		result = buffer.toString();
		return result;
	}

	/**
	 * 获取国际化资源文件中的键所对应的值
	 * 
	 * @param key
	 * @return
	 */
	public static String getLocaleBundleResourceValue(String key) {
		// 获取系统默认的国家/语言环境
		Locale myLocale = Locale.getDefault();
		// 根据指定的国家/语言环境加载资源文件
		ResourceBundle bundle = ResourceBundle.getBundle("yitianplatform", myLocale);
		// 获取资源文件中的key为hello的value值
		return bundle.getString(key);

	}

	/**
	 * 将list的内容写入到指定的txt文档里
	 * 
	 * @Title: writeTxt
	 * @Description: 
	 * @param @param fileName
	 * @param @param list
	 * @param @throws IOException 设定文件
	 * @return void 返回类型
	 * @author zhu.b
	 * @date 2011-6-16 下午01:32:31
	 * @throws
	 */
	
	public static void writeTxt(String dir, List list) throws IOException {
		FileWriter fileWriter = new FileWriter(dir);
		for (int i = 0; i < list.size(); i++) {
			fileWriter.write(String.valueOf(list.get(i) + ""));

		}
		fileWriter.flush();
		fileWriter.close();

	}
	
	public static FileWriter writeTxtNew(String fileName, List list,boolean needNewLind) throws IOException {
		FileWriter fileWriter =null;
		try {
			fileWriter = new FileWriter(fileName);
			for (int i = 0; i < list.size(); i++) {
				fileWriter.write(String.valueOf(list.get(i)));
				if(needNewLind)
				{
					fileWriter.write("\r\n");
				}
			}
			fileWriter.flush();
			return fileWriter;
		} finally{
			if(fileWriter!=null)
			{
				fileWriter.close();
			}
		}
	}
	

	/**
	 * 判断list是否有值
	 * */
	@SuppressWarnings("rawtypes")
	public static boolean hasValue(List list) {
		return ((null != list) && (list.size() > 0));
	}

	public static boolean hasValue(String s) {
		return (s != null) && (s.trim().length() > 0);
	}

	/**
	 * 验证是否为Double
	 * @param value
	 * @return
	 */
	public static boolean validateDouble(String value) {
		if (value == null || value.equals(""))
			return false;
		try {
			new Double(value);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	/**
	 * 验证是否为Long
	 * @param value
	 * @return
	 */
	public static boolean validateLong(String value) {
		if (value == null || value.equals(""))
			return false;
		try {
			new Long(value);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	

	/**
	 * 验证是否为Date类型
	 * @param value
	 * @return
	 */
	public static boolean validateDate(String value) {
		if (value == null || value.equals(""))
			return false;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			sdf.setLenient(false);
			sdf.parse(value);
			System.out.println(sdf.parse(value));
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	/**
	 * 从字符串转换为Double
	 * 
	 * @param str
	 * @return
	 */
	public static double stringToDouble(String str) {
		NumberFormat formater = NumberFormat.getInstance();
		double value = 0;
		try {
			if (str == null || str.trim().length() == 0 || !validateDouble(str)) {
				str = "0";
			}
			value = formater.parse(str).doubleValue();
		} catch (Exception e) {
			// SuperContext.showExceptionMsg(e);
		}
		return value;
	}

	public static Map conditionExpMap() {
		Map<String, String> conditionExpMap = new HashMap<String, String>();
		conditionExpMap.put("等于", "=");
		conditionExpMap.put("不等于", "<>");
		conditionExpMap.put("大于", ">");
		conditionExpMap.put("大于等于", ">=");
		conditionExpMap.put("小于", "<");
		conditionExpMap.put("小于等于", "<=");
		conditionExpMap.put("包含", "like"); // like '%XXX%'
		conditionExpMap.put("不包含", "not like"); // not like '%XXX%'
		conditionExpMap.put("以开头", "like"); // like  '%XXX'
		conditionExpMap.put("以结尾", "like"); // like 'XXX%'
		return conditionExpMap;
	}

	public static String getConditionExpMap(String conditionExp) {
		return (conditionExpMap().get(conditionExp) != null) ? (String.valueOf(conditionExpMap().get(conditionExp)))
				: "=";
	}

	public static String getCurrentDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(new Date());

	}

	public static String getCurrentDateTime() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(new Date());
	}

    
     /**
      * 通过反射获得某方法信息
      * @param owner
      * @param methodName
      * @param args
      * @return
      * @throws Exception
      */
	 public static Object invokeMethod(Object owner, String methodName, Object[] args) throws Exception {
	      Class ownerClass = owner.getClass();
	      Class[] argsClass = new Class[args.length];
	      for (int i = 0, j = args.length; i < j; i++) {
	          argsClass[i] = args[i].getClass();
	      }
	     Method method = ownerClass.getMethod(methodName, argsClass);
	     return method.invoke(owner, args);
      }
	
	 /**
	  * 验证权限位
	  * @param power_value  存在 角色模块相关表中
	  * @param index  1-增加 2-修改   操作编号
	  * @return
	  */
	public static boolean checkPower(int power_value,int index){
		boolean flag=false;
		int temp=(int)Math.pow(2,index);
		int result = power_value&temp;
		if(result==temp){
			flag=true;
		}
		return flag;
	}
	
	/**
	 * 
	 * @param powerStr 1,2,3,4
	 * @return
	 */
	public  static int getPower(String powerStr){
		int result=0;
		if(CommonUtil.hasValue(powerStr)){
			String[] temp=powerStr.split(",");
			if(temp!=null&&temp.length>0){
				for(String tempV:temp){
					if(hasValue(tempV)){
						result+=(int)Math.pow(2,Integer.valueOf(tempV));
					}
				}
			}
		}
		return  result;
	}
	  
	
	



	
	public  static void printObjectSetMethodValue(Object obj,String setObjectName,String getObjectName){
		Method[] methods = obj.getClass().getDeclaredMethods();
		if(null==methods || methods.length==0){
			return;
		}
		for(Method method :methods){
			if(method.getName().startsWith("set")){
				String setMethodName = method.getName();
				String getMethodName = "get"+setMethodName.substring(3);
				System.out.println(setObjectName+"."+setMethodName+"("+getObjectName+"."+getMethodName+"());");
			}
			
		}
		
		
	}

	/**
	 * 获取32位 UUID
	 * @return
	 */
	public static String getUUID32() {
		String uuid = UUID.randomUUID().toString();
		return uuid.replace("-", "");
	}
	
	/**
	 * 字符串转int,如果为空,使用一个默认值
	 * @param valueStr
	 * @param defaultValue
	 * @return
	 */
	public static int getIntValue(String valueStr,int defaultValue){
		
		return(StringUtils.isNotEmpty(valueStr)&&StringUtils.isNumeric(valueStr)) ?  Integer.parseInt(valueStr):defaultValue;
	}
	
	public static String getStrValue(String valueStr,String defaultValue){
		
		return StringUtils.isEmpty(valueStr) ? defaultValue : String.valueOf(valueStr);
	}
	
	/**
	 * 填充字符串
	 * @param originStr
	 * @param paddingStr
	 * @param totalLength
	 * @return
	 */
	public static StringBuilder paddingStr(String originStr,String paddingStr,int totalLength)
	{
		StringBuilder sb=new StringBuilder(originStr);
		int length=originStr==null?0:originStr.length();
		for (int i = 0; i < totalLength-length; i++) {
			sb.append(paddingStr);
		}
		return sb;
	}
	
	public static void main(String[] args) throws Exception {
		String ree = CommonUtil.md5("123456");
		System.out.println(ree);
		String ree1 =CommonUtil.md5(ree);
		System.out.println(ree1);
		
	}
	
	
	
	//判断字符串是否为汉字
	public static boolean isChinese(String str) {
		if (str.getBytes().length == str.length()) {
			return false;
		}
		return true;
	}
	
	//转换类型
	public static Object getValueTypeForXLSX(Cell cell) {
		if (cell == null)
			return null;
		switch (cell.getCellType()) {
		case Cell.CELL_TYPE_BLANK: //BLANK:  
			return null;
		case Cell.CELL_TYPE_BOOLEAN: //BOOLEAN:  
			return cell.getBooleanCellValue();
		case Cell.CELL_TYPE_NUMERIC: //NUMERIC:  
			return (long) cell.getNumericCellValue();
		case Cell.CELL_TYPE_STRING: //STRING:  
			return cell.getStringCellValue();
		case Cell.CELL_TYPE_ERROR: //ERROR:  
			return cell.getErrorCellValue();
		case Cell.CELL_TYPE_FORMULA: //FORMULA:  
		default:
			return cell.getCellFormula();
		}
	}	
}
