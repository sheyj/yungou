package com.yungou.o2o.controller;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yungou.o2o.center.base.BaseService;
import com.yungou.o2o.center.base.CommonOperatorEnum;
import com.yungou.o2o.center.base.ServiceException;
import com.yungou.o2o.center.base.SimplePage;
import com.yungou.o2o.common.BeanUtilsCommon;
import com.yungou.o2o.common.CustomDateEditorBase;
import com.yungou.o2o.common.HSSFExport;

/**
 * controller基类
 * 
 * @author username
 * @date 2014-5-19 下午4:12:46
 * @version 0.1.0 
 * @copyright yougou.com 
 */
public abstract class BaseController<ModelType> {

	private static final Logger logger = Logger.getLogger(BaseController.class);

	private BaseService service;

	private CrudInfo crudInfo;

	@PostConstruct
	protected void initConfig() {
		this.crudInfo = this.init();
		this.service = crudInfo.getService();
	}

	protected abstract CrudInfo init();

	@ExceptionHandler  
	public String handleServiceException(HttpServletRequest request, Exception ex) {
		request.setAttribute("ex", ex);
		logger.error("系统异常!",ex);
		// 根据不同错误转向不同页面  
		return "error";
	}

//	@ResponseBody
//	@ExceptionHandler(ServiceException.class)
//	public ResultVo handleServiceException(ServiceException ex, HttpServletRequest request) {
//		return handleException(ex, request);
//	}

//	public static ResultVo handleException(Exception ex, HttpServletRequest request) {
//		String errorDetail = getStackTrace(ex);
//		logger.info("业务系统内部异常>>>>>>>>>" + request.getRequestURI());
//		logger.error(ex.getMessage());
//		logger.error(errorDetail);
//		ResultVo resultVo = new ResultVo();
//		resultVo.setErrorCode(1000);
//		resultVo.setErrorMessage("业务系统内部异常"); //ex.getMessage()
//		resultVo.setErrorDetail(errorDetail);
//		return resultVo;
//	}

//	/** 
//	 * 获取异常的堆栈信息 
//	 *  
//	 * @param t 
//	 * @return 
//	 */
//	private static String getStackTrace(Throwable t) {
//		StringWriter sw = new StringWriter();
//		PrintWriter pw = new PrintWriter(sw);
//		try {
//			t.printStackTrace(pw);
//			return sw.toString();
//		} finally {
//			pw.close();
//		}
//	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		dateFormat.setLenient(false);
		binder.registerCustomEditor(Date.class, new CustomDateEditorBase(dateFormat, false));
	}

	@RequestMapping(value = "/list.json")
	@ResponseBody
	public Map<String, Object> queryList(HttpServletRequest req, Model model) throws ServiceException {
		int pageNo = StringUtils.isEmpty(req.getParameter("page")) ? 1 : Integer.parseInt(req.getParameter("page"));
		int pageSize = StringUtils.isEmpty(req.getParameter("rows")) ? 10 : Integer.parseInt(req.getParameter("rows"));
		String sortColumn = StringUtils.isEmpty(req.getParameter("sort")) ? "" : String.valueOf(req
				.getParameter("sort"));
		String sortOrder = StringUtils.isEmpty(req.getParameter("order")) ? "" : String.valueOf(req
				.getParameter("order"));
		Map<String, Object> params = builderParams(req, model);
		int total = this.service.findCount(params);
		Map<String, Object> obj = new HashMap<String, Object>();
		obj.put("total", total);
		if(total ==0){
			obj.put("rows", new ArrayList<ModelType>());
			return obj;
		}
		SimplePage page = new SimplePage(pageNo, pageSize, (int) total);
		List<ModelType> list = this.service.findByPage(page, sortColumn, sortOrder, params);
		obj.put("rows", list);
		return obj;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> builderParams(HttpServletRequest req, Model model) {
		Map<String, Object> params = req.getParameterMap();
		if (null != params && params.size() > 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			for (Entry<String, Object> p : params.entrySet()) {
				if (null == p.getValue() || StringUtils.isEmpty(p.getValue().toString()))
					continue;
				// 只转换一个参数，多个参数不转换
				String values[] = (String[]) p.getValue();
				String match = "^((((1[6-9]|[2-9]\\d)\\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\\d):[0-5]?\\d:[0-5]?\\d$";
				if (values[0].matches(match)) {
					try {
						p.setValue(sdf.parse(values[0]));
					} catch (ParseException e) {
						e.printStackTrace();
					}
				} else if (p.getKey().equals("queryCondition") && model.asMap().containsKey("queryCondition")) {
					p.setValue(model.asMap().get("queryCondition"));
				} else {
					p.setValue(values[0]);
				}
			}
		}
		return params;
	}

	@RequestMapping(value = "/get_count.json")
	public ResponseEntity<Integer> getCount(HttpServletRequest req, Model model) throws ServiceException {
		Map<String, Object> params = builderParams(req, model);
		int total = this.service.findCount(params);
		return new ResponseEntity<Integer>(total, HttpStatus.OK);
	}

	@RequestMapping(value = "/list")
	public String list() {
		return crudInfo.ftlFolder + "list";
	}

	@RequestMapping(value = "/get")
	public ResponseEntity<ModelType> get(String key) throws ServiceException {
		ModelType type = service.findById(key);
		return new ResponseEntity<ModelType>(type, HttpStatus.OK);
	}

	@RequestMapping(value = "/get_biz")
	@ResponseBody
	public List<ModelType> getBiz(ModelType modelType, HttpServletRequest req, Model model) throws ServiceException {
		Map<String, Object> params = builderParams(req, model);
		return this.service.findByBiz(modelType, params);
	}

	@RequestMapping(value = "/post")
	public ResponseEntity<ModelType> add(ModelType type) throws ServiceException {
		service.add(type);
		return new ResponseEntity<ModelType>(type, HttpStatus.OK);
	}

	@RequestMapping(value = "/put")
	public ResponseEntity<ModelType> moditfy(ModelType type) throws ServiceException {
		service.modifyById(type);
		return new ResponseEntity<ModelType>(type, HttpStatus.OK);
	}

	@RequestMapping(value = "/delete")
	public ResponseEntity<Map<String, Boolean>> remove(ModelType type) throws ServiceException {
		service.deleteById(type);
		Map<String, Boolean> flag = new HashMap<String, Boolean>();
		flag.put("success", true);
		return new ResponseEntity<Map<String, Boolean>>(flag, HttpStatus.OK);
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/save")
	public ResponseEntity<Map<String, Boolean>> save(HttpServletRequest req) throws JsonParseException,
			JsonMappingException, IOException, ServiceException {
		Map<String, Boolean> flag = new HashMap<String, Boolean>();

		String deletedList = StringUtils.isEmpty(req.getParameter("deleted")) ? "" : req.getParameter("deleted");
		String upadtedList = StringUtils.isEmpty(req.getParameter("updated")) ? "" : req.getParameter("updated");
		String insertedList = StringUtils.isEmpty(req.getParameter("inserted")) ? "" : req.getParameter("inserted");
		ObjectMapper mapper = new ObjectMapper();
		Map<CommonOperatorEnum, List<ModelType>> params = new HashMap<CommonOperatorEnum, List<ModelType>>();
		if (StringUtils.isNotEmpty(deletedList)) {
			List<Map> list = mapper.readValue(deletedList, new TypeReference<List<Map>>() {
			});
			List<ModelType> oList = convertListWithTypeReference(mapper, list);
			params.put(CommonOperatorEnum.DELETED, oList);
		}
		if (StringUtils.isNotEmpty(upadtedList)) {
			List<Map> list = mapper.readValue(upadtedList, new TypeReference<List<Map>>() {
			});
			List<ModelType> oList = convertListWithTypeReference(mapper, list);
			params.put(CommonOperatorEnum.UPDATED, oList);
		}
		if (StringUtils.isNotEmpty(insertedList)) {
			List<Map> list = mapper.readValue(insertedList, new TypeReference<List<Map>>() {
			});
			List<ModelType> oList = convertListWithTypeReference(mapper, list);
			params.put(CommonOperatorEnum.INSERTED, oList);
		}
		if (params.size() > 0) {
			service.save(params);
		}
		flag.put("success", true);
		return new ResponseEntity<Map<String, Boolean>>(flag, HttpStatus.OK);
	}

	/**
	 * 转换成泛型列表
	 * @param mapper
	 * @param list
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws JsonGenerationException
	 * @throws IOException
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private List<ModelType> convertListWithTypeReference(ObjectMapper mapper, List<Map> list)
			throws JsonParseException, JsonMappingException, JsonGenerationException, IOException {
		Class<ModelType> entityClass = (Class<ModelType>) ((ParameterizedType) getClass().getGenericSuperclass())
				.getActualTypeArguments()[0];
		List<ModelType> tl = new ArrayList<ModelType>(list.size());
		for (int i = 0; i < list.size(); i++) {
			ModelType type = mapper.readValue(mapper.writeValueAsString(list.get(i)), entityClass);
			tl.add(type);
		}
		return tl;
	}

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/do_export")
	public void doExport(ModelType modelType, HttpServletRequest req, Model model, HttpServletResponse response)
			throws ServiceException {
		Map<String, Object> params = builderParams(req, model);
		String exportColumns = (String) params.get("exportColumns");
		String fileName = (String) params.get("fileName");
		ObjectMapper mapper = new ObjectMapper();
		if (StringUtils.isNotEmpty(exportColumns)) {
			try {
				exportColumns = exportColumns.replace("[", "");
				exportColumns = exportColumns.replace("]", "");
				exportColumns = "[" + exportColumns + "]";

				//字段名列表
				List<Map> ColumnsList = mapper.readValue(exportColumns, new TypeReference<List<Map>>() {
				});

				//List<ModelType> list= this .service .findByBiz(modelType, params);
				int total = this.service.findCount(params);
				SimplePage page = new SimplePage(1, total, (int) total);
				List<ModelType> list = this.service.findByPage(page, "", "", params);
				List<Map> listArrayList = new ArrayList<Map>();
				if (list != null && list.size() > 0) {
					for (ModelType vo : list) {
						Map map = new HashMap();
						BeanUtilsCommon.object2MapWithoutNull(vo, map);
						listArrayList.add(map);

					}
					HSSFExport.commonExportData(StringUtils.isNotEmpty(fileName) ? fileName : "导出信息", ColumnsList,
							listArrayList, response);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

		} else {

		}

	}

	public class CrudInfo {

		public CrudInfo(String ftlFolder, BaseService service) {
			super();
			this.ftlFolder = ftlFolder;
			this.service = service;
		}

		private String ftlFolder;

		private BaseService service;

		public String getFtlFolder() {
			return ftlFolder;
		}

		public void setFtlFolder(String ftlFolder) {
			this.ftlFolder = ftlFolder;
		}

		public BaseService getService() {
			return service;
		}

		public void setService(BaseService service) {
			this.service = service;
		}

	}
}
