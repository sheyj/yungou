var systemParam = {};

//
systemParam.initcombobox = function() {
	$('#statusCondition').combobox({
			 url:BasePath+'/initCache/getCodeDictsList?lookupcode=SYSTEM_PARAM_STATUS',
		     valueField:"codeValue",
		     textField:"codeName",
		     panelHeight:"auto"
	});
	
	$('#statusAdd').combobox({
		 url:BasePath+'/initCache/getCodeDictsList?lookupcode=SYSTEM_PARAM_STATUS',
	     valueField:"codeValue",
	     textField:"codeName",
	     panelHeight:"auto"
	});
	
	$('#paramTypeCondition').combobox({
		 url:BasePath+'/initCache/getCodeDictsList?lookupcode=SYSTEM_PARAM_TPYE',
	     valueField:"codeValue",
	     textField:"codeName",
	     panelHeight:"auto"
	});
	
	$('#paramTypeAdd').combobox({
		 url:BasePath+'/initCache/getCodeDictsList?lookupcode=SYSTEM_PARAM_TPYE',
	     valueField:"codeValue",
	     textField:"codeName",
	     panelHeight:"auto"
	});
};

$(document).ready(function() {
	systemParam.initcombobox();
});


systemParam.loadDataGrid = function(){
	$('#dataGridJG').datagrid({
		'url':BasePath+'/system/system_param/list.json',
		'title':'系统参数维护',
		'pageNumber':1 
		});
};



//查询公司资料信息
systemParam.searchInfo = function(){
	var queryParams=$('#searchForm').form('getData');
	var queryMxURL=BasePath+'/system/system_param/list.json';
   // 3.加载明细
    $( "#dataGridJG").datagrid( 'options' ).queryParams= queryParams;
    $( "#dataGridJG").datagrid( 'options' ).url=queryMxURL;
    $( "#dataGridJG").datagrid( 'load' );
    
};

//清楚查询条件
systemParam.searchClear = function(){
	$('#searchForm').form("clear");
};

//清空表单
systemParam.clearForm = function(){
	$("#dataForm").form('clear');
	$("#dataForm input").removeAttr("readonly").removeClass("disabled");
};

//新增对话框
systemParam.addInfo = function() {
	systemParam.clearForm();
	ygDialog({
		title:'新增',
		target:$('#myFormPanel'),
		width:780,
		height:300,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(dialog){
				systemParam.do_save(dialog);
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(dialog){
				systemParam.clearForm();
				dialog.close();
			}
		}]
	});
};


systemParam.checkExistFun = function(url,checkColumnJsonData){
	var checkExist=false;
 	$.ajax({
		  type: 'POST',
		  url: url,
		  data: checkColumnJsonData,
		  cache: true,
		  async:false, // 一定要
		  success: function(totalData){
			  totalData = parseInt(totalData,10);
			  if(totalData>0){
				  checkExist=true;
			  }
		  }
     });
 	return checkExist;
};


//保存对话框
systemParam.do_save = function(dialog) {
	var fromObj = $('#dataForm');
	//1.校验必填项
	var validateForm = fromObj.form('validate');
	if (validateForm == false) {
		return;
	}
	//2.检验是否有重复记录((1)主键不重复(如果是序列生成就不用),(2)名称不能重复等等)
	var checkUrl = BasePath + '/system/system_param/get_count.json';
	var checkDataNo = {
		"paramName" : $("#paramName").val()
	};
	if (systemParam.checkExistFun(checkUrl, checkDataNo)) {
		showError('登录用户名已存在,不能重复!');
		$("#paramName").focus();
		return;
	}

	//3. 保存
	var url = BasePath + '/system/system_param/post';
	fromObj.form('submit', {
		url : url,
		success : function() {
			//4.保存成功,清空表单
			showSuc('新增成功!');
			$("#myFormPanel").window('close');
			systemParam.clearForm();
			systemParam.loadDataGrid();
			return;
		},
		error : function() {
			showError('新增失败,请联系管理员!');
		}
	});
};

//删除
systemParam.delInfo = function() {
	var checkedRows = $("#dataGridJG").datagrid("getChecked");// 获取所有勾选checkbox的行
	if (checkedRows.length < 1) {
		showError('请选择要删除的记录!');
		return;
	}
	$.messager.confirm("确认", "你确定要删除这" + checkedRows.length + "条数据",
			function(r) {
				if (r) {
					var keyStr = [];
					$.each(checkedRows, function(index, item) {
						var keyno = new Object();
						keyno.id = item.id;
						keyStr.push(keyno);
					});
					//2.绑定数据
					var url = BasePath + '/system/system_param/save';
					var data = {
						deleted : JSON.stringify(keyStr),
					};
					//3. 删除
					ajaxRequest(url, data, function(result) {
						if (result) {
							//4.删除成功,清空表单
							showSuc('删除成功!');
							systemParam.loadDataGrid();
						} else {
							showError('删除失败,请联系管理员!');
						}
					});
				}
			});
};

systemParam.editInfo = function(cartypeNo){
	var checkedRows = $("#dataGridJG").datagrid("getChecked");// 获取所有勾选checkbox的行
	if (checkedRows.length < 1) {
		showWarn('请选择要修改的记录!',1);
		return;
	}else if(checkedRows.length>1){
		showWarn('只能修改一条记录!',1);
		return;
	}else{
		systemParam.clearForm();
		$('#dataForm').form('load',checkedRows[0]);
		ygDialog({
			title:'修改',
			target:$('#myFormPanel'),
			width:780,
			height:300,
			buttons:[{
				text:'保存',
				iconCls:'icon-save',
				handler:function(dialog){
					systemParam.do_update(dialog);
				}
			},{
				text:'取消',
				iconCls:'icon-cancel',
				handler:function(dialog){
					systemParam.clearForm();
					dialog.close();
				}
			}]
		});
	}
};

systemParam.loadDetail = function(rowData){
	$('#dataForm').form('load',rowData);
	$("#dataForm input").addClass("disabled").attr("readonly",true);
	ygDialog({
		title:'详情',
		target:$('#myFormPanel'),
		width:780,
		height:300,
	});
};
systemParam.do_update = function(dialog) {
	var fromObj = $('#dataForm');
	//1.校验必填项
	var validateForm = fromObj.form('validate');
	if (validateForm == false) {
		return;
	}
	//3. 保存
	var url = BasePath + '/system/system_param/put';
	fromObj.form('submit', {
		url : url,
		success : function() {
			//4.保存成功,清空表单
			showSuc('修改成功!');
			$("#myFormPanel").window('close');
			systemParam.clearForm();
			systemParam.loadDataGrid();
			return;
		},
		error : function() {
			showError('修改失败,请联系管理员!');
		}
	});
};

//导出
systemParam.exportExcel=function(){
	exportExcelBaseInfo('dataGridJG','/system/system_param/do_export.htm','系统用户信息导出');
};


