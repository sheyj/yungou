package com.yungou.o2o.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;

import com.yungou.o2o.util.DateUtil;
import com.yungou.o2o.util.UUIDUtil;

/**
 * 文件上传
 */
public class UploadFileServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static final Logger logger = Logger.getLogger(UploadFileServlet.class);

	public UploadFileServlet() {
		super();
	}

	@SuppressWarnings("static-access")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			logger.info("IP:" + request.getRemoteAddr());
			// 1、创建工厂类：DiskFileItemFactory
			DiskFileItemFactory facotry = new DiskFileItemFactory();
			String tempPath = File.separator + "temp";
			String tempDir = getServletContext().getRealPath(tempPath);
			facotry.setRepository(new File(tempDir));//设置临时文件存放目录
			facotry.setSizeThreshold(1024 * 1024);
			// 2、创建核心解析类：ServletFileUpload
			ServletFileUpload upload = new ServletFileUpload(facotry);
			upload.setHeaderEncoding("UTF-8");// 解决上传的文件名乱码
			upload.setFileSizeMax(5 * 1024 * 1024);// 单个文件上传最大值是3M
			upload.setSizeMax(20 * 1024 * 1024);//文件上传的总大小限制20M
			// 3、判断用户的表单提交方式是不是multipart/form-data
			boolean bb = upload.isMultipartContent(request);
			if (!bb) {
				return;
			}

			StringBuffer imagePath = new StringBuffer();
			// 4、是：解析request对象的正文内容List<FileItem>
			List<FileItem> items = upload.parseRequest(request);
			String realPath = File.separator + "upload";
			String storePath = getServletContext().getRealPath(realPath);// 上传的文件的存放目录
			String currentDate = DateUtil.getCurrentDateToStr();
			for (FileItem item : items) {
				if (item.isFormField()) {
					// 5、判断是否是普通表单：打印看看
					String fieldName = item.getFieldName();// 请求参数名
					String fieldValue = item.getString("UTF-8");// 请求参数值
					logger.info("上传文件：" + fieldName + "=" + fieldValue);
				} else {
					// 6、上传表单：得到输入流，处理上传：保存到服务器的某个目录中
					String fileName = item.getName();// 得到上传文件的名称
					//解决用户没有选择文件上传的情况
					if (fileName == null || fileName.trim().equals("")) {
						continue;
					}
					fileName = fileName.toLowerCase().substring(fileName.lastIndexOf(File.separator) + 1).trim();
					
					String tokenName = fileName.substring(fileName.lastIndexOf("."), fileName.length()); 
					String newFileName = UUIDUtil.getUuid()+tokenName;
					logger.info("上传的文件名是：" + fileName +"新文件名称："+newFileName);
					InputStream in = item.getInputStream();
					String path = storePath + File.separator + currentDate;
					File file = new File(path);
					if (!file.exists())
						file.mkdirs();

					String savePath = path + File.separator + newFileName;
					OutputStream out = new FileOutputStream(savePath);
					byte b[] = new byte[1024];
					int len = -1;
					while ((len = in.read(b)) != -1) {
						out.write(b, 0, len);
					}
					in.close();
					out.close();
					item.delete();//删除临时文件
					imagePath.append("upload/" + currentDate + "/"+ newFileName + ";");
				}
			}

			response.getOutputStream().write(imagePath.toString().getBytes("UTF-8"));
			response.setContentType("text/json; charset=UTF-8");
		} catch (Exception e) {
			logger.error("上传文件失败！", e);
			response.getOutputStream().write("".getBytes("UTF-8"));
			response.setContentType("text/json; charset=UTF-8");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		doGet(request, response);
	}

}
