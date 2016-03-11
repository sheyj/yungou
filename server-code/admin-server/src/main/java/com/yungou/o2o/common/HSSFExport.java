package com.yungou.o2o.common;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFFooter;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.Region;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;

/**
 * TODO: 增加描述
 * 
 * @author username
 * @date 2014-5-19 下午4:30:20
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public class HSSFExport {
	/**
	 * 导出数据到Excel,自动获取easyui的表头信息 与 查询条件  暂时不支持合并的表头  纵横转换的表头是单独写的
	 * @param fileName
	 * @param ColumnsMapList
	 * @param dataMapList
	 * @param response
	 * @throws Exception
	 */
	public static void commonExportData(String fileName, List<Map> ColumnsMapList, List<Map> dataMapList,
			HttpServletResponse response) throws Exception {
		response.setContentType("application/vnd.ms-excel");

		String fileName2 = new String(fileName.getBytes("gb2312"), "iso-8859-1");
		//文件名
		response.setHeader("Content-Disposition", "attachment;filename=" + fileName2 + ".xls");
		response.setHeader("Pragma", "no-cache");
		HSSFWorkbook wb = new HSSFWorkbook();
		HSSFSheet sheet1 = wb.createSheet();
		//HSSFSheet  sheet2=wb.createSheet();
		//wb.setSheetName(1,"魏海金",HSSFWorkbook.ENCODING_UTF_16);
		//sheet名字
		wb.setSheetName(0, fileName);
		sheet1.setDefaultRowHeightInPoints(20);
		sheet1.setDefaultColumnWidth((short) 18);
		//设置页脚
		HSSFFooter footer = sheet1.getFooter();
		footer.setRight("Page " + HSSFFooter.page() + " of " + HSSFFooter.numPages());
		//设置样式 表头
		HSSFCellStyle style1 = wb.createCellStyle();
		style1.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		HSSFFont font1 = wb.createFont();
		font1.setFontHeightInPoints((short) 13);
		font1.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style1.setFont(font1);
		//设置样式 表头
		HSSFCellStyle style2 = wb.createCellStyle();
		style2.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		style2.setWrapText(true);
		//合并
		Region rg1 = new Region(0, (short) 0, 0, (short) (ColumnsMapList.size() - 1));
		sheet1.addMergedRegion(rg1);
		//设置样式 表头
		HSSFCellStyle style3 = wb.createCellStyle();
		style3.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		HSSFFont font3 = wb.createFont();
		font3.setFontHeightInPoints((short) 18);
		font3.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style3.setFont(font3);
		style3.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
		style3.setFillPattern(CellStyle.SOLID_FOREGROUND);
		HSSFRow row0 = sheet1.createRow(0);
		row0.setHeightInPoints(35);
		//第一行 提示长
		HSSFCell cell0 = row0.createCell((short) 0);
		cell0.setCellValue(fileName.toString());
		cell0.setCellStyle(style3);
		//设置表头
		HSSFRow row1 = sheet1.createRow(1);
		row1.setHeightInPoints(20);
		for (int i = 0; i < ColumnsMapList.size(); i++) {
			HSSFCell cell1 = row1.createCell((short) (i));
			cell1.setCellType(HSSFCell.ENCODING_UTF_16);
			cell1.setCellValue(ColumnsMapList.get(i).get("title").toString());
			cell1.setCellStyle(style1);
		}

		//填充数据
		for (int j = 0; j < dataMapList.size(); j++) {
			HSSFRow row2 = sheet1.createRow((short) (j + 2)); // 第三行开始填充数据 
			Map cellDataMap = dataMapList.get(j);
			for (int i = 0; i < ColumnsMapList.size(); i++) {
				HSSFCell cell = row2.createCell((short) i);
				String cellValue = "";
				if (ColumnsMapList.get(i).get("field") != null) {
					String fieldString = String.valueOf(ColumnsMapList.get(i).get("field"));
					cellValue = String.valueOf(cellDataMap.get(fieldString));
				}
				cell.setCellValue(cellValue);
				cell.setCellStyle(style2);
			}

		}
		wb.write(response.getOutputStream());
		response.getOutputStream().flush();
		response.getOutputStream().close();
	}
}
