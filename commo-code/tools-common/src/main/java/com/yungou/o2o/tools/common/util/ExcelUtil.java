package com.yungou.o2o.tools.common.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Excel工具类
 * 
 * @author lin.zb
 * @date 2016年2月15日 下午5:57:36
 * @version 1.0.0 
 * @copyright wonhigh.net.cn
 */
public class ExcelUtil {
	
	private static final Logger LOG = LoggerFactory.getLogger(ExcelUtil.class);
	
	/**
	 * 获取单元格数据内容为字符串类型的数据
	 * 
	 * @param cell Excel单元格
	 * @return String 单元格数据内容
	 */
	public static String getStringCellValue(XSSFCell cell) {
		String strCell = "";
		switch (cell.getCellType()) {
			case XSSFCell.CELL_TYPE_STRING:
				strCell = cell.getStringCellValue();
				break;
			case XSSFCell.CELL_TYPE_NUMERIC:
				strCell = String.valueOf(cell.getNumericCellValue());
				break;
			case XSSFCell.CELL_TYPE_BOOLEAN:
				strCell = String.valueOf(cell.getBooleanCellValue());
				break;
			case XSSFCell.CELL_TYPE_BLANK:
				strCell = "";
				break;
			default:
				strCell = "";
				break;
		}
		if (strCell.equals("") || strCell == null) {
			return "";
		}
		return strCell;
	}

	/**
	 * 获取单元格数据内容为日期类型的数据
	 * 
	 * @param cell Excel单元格
	 * @return String 单元格数据内容
	 */
	public static String getDateCellValue(XSSFCell cell) {
		String result = "";
		try {
			int cellType = cell.getCellType();

			if (cellType == XSSFCell.CELL_TYPE_NUMERIC) {

				Date date = cell.getDateCellValue();

				Calendar cal = Calendar.getInstance();
				cal.setTime(date);

				result = (cal.get(Calendar.YEAR) + 1900) + "-" + (cal.get(Calendar.MONTH) + 1) + "-"
						+ cal.get(Calendar.DAY_OF_MONTH);

			}
			else if (cellType == XSSFCell.CELL_TYPE_STRING) {
				String date = getStringCellValue(cell);
				result = date.replaceAll("[年月]", "-").replace("日", "").trim();
			}
			else if (cellType == XSSFCell.CELL_TYPE_BLANK) {
				result = "";
			}
		}
		catch (Exception e) {
			LOG.error(e.toString(), e);
		}
		return result;
	}

	/**
	 * 根据HSSFCell类型设置数据
	 * 
	 * @param cell
	 * @return
	 */
	public static String getCellFormatValue(XSSFCell cell) {
		String cellvalue = "";
		if (cell != null) {
			// 判断当前Cell的Type
			switch (cell.getCellType()) {
			// 如果当前Cell的Type为NUMERIC
				case XSSFCell.CELL_TYPE_NUMERIC:
					cellvalue = String.valueOf(cell.getNumericCellValue());
					break;
				// 如果当前Cell的Type为STRING
				case XSSFCell.CELL_TYPE_STRING:
					// 取得当前的Cell字符串
					cellvalue = cell.getRichStringCellValue().getString();
					break;
				case XSSFCell.CELL_TYPE_FORMULA: {
					// 判断当前的cell是否为Date
					if (HSSFDateUtil.isCellDateFormatted(cell)) {
						// 如果是Date类型则，转化为Data格式

						// 方法1：这样子的data格式是带时分秒的：2011-10-12 0:00:00
						// cellvalue = cell.getDateCellValue().toLocaleString();

						// 方法2：这样子的data格式是不带带时分秒的：2011-10-12
						Date date = cell.getDateCellValue();
						SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
						cellvalue = sdf.format(date);
						break;
					}
					break;
				}

				// 默认的Cell值
				default:
					cellvalue = " ";
			}
		}
		else {
			cellvalue = "";
		}
		return cellvalue;

	}

	/**
	 * 读取Excel表格表头的内容
	 * 
	 * @param InputStream
	 * @return String 表头内容的数组
	 */
	public static String[] readExcelTitle(XSSFWorkbook wb) {
		XSSFSheet sheet = wb.getSheetAt(0);
		XSSFRow row = sheet.getRow(0);
		// 标题总列数
		int colNum = row.getPhysicalNumberOfCells();
		// System.out.println("colNum:" + colNum);
		String[] title = new String[colNum];
		for (int i = 0; i < colNum; i++) {
			title[i] = getCellFormatValue(row.getCell((short) i));
		}
		return title;
	}

	/**
	 * 判断exce文件的头部信息是否正确
	 * 
	 * @param bis
	 * @param titles
	 * @param length
	 * @return
	 */
	public static boolean isExistTitles(XSSFWorkbook wb, String[] titles) {
		boolean flag = false;
		if (titles == null || titles.length == 0) {
			return true;
		}
		if (wb == null) {
			return true;
		}
		String[] titleRes = readExcelTitle(wb);
		if (titles.length != titleRes.length) {
			return true;
		}
		for (int i = 0; i < titles.length; i++) {
			if (titles[i].equals(titleRes[i])) {
				continue;
			}
			else {
				flag = true;
				break;
			}
		}
		return flag;
	}
}
