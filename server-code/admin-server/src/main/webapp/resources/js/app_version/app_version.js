var appVersion = {};

//
appVersion.initcombobox = function() {
	
	$('#forceCondition').combobox({
		 url:BasePath+'/initCache/getCodeDictsList?lookupcode=APP_VERSION_TYPE',
	     valueField:"codeValue",
	     textField:"codeName",
	     panelHeight:"auto"
	});
	
	$('#forceAdd').combobox({
		 url:BasePath+'/initCache/getCodeDictsList?lookupcode=APP_VERSION_TYPE',
	    valueField:"codeValue",
	    textField:"codeName",
	    panelHeight:"auto"
	});

};

$(document).ready(function() {
	appVersion.initcombobox();
});


appVersion.loadDataGrid = function(){
	$('#dataGridJG').datagrid({
		'url':BasePath+'/system/app_version/list.json',
		'title':'APP版本维护',
		'pageNumber':1 
		});
};



//查询公司资料信息
appVersion.searchInfo = function(){
	var queryParams=$('#searchForm').form('getData');
	var queryMxURL=BasePath+'/system/app_version/list.json';
   // 3.加载明细
    $( "#dataGridJG").datagrid( 'options' ).queryParams= queryParams;
    $( "#dataGridJG").datagrid( 'options' ).url=queryMxURL;
    $( "#dataGridJG").datagrid( 'load' );
    
};

//清楚查询条件
appVersion.searchClear = function(){
	$('#searchForm').form("clear");
};

//清空表单
appVersion.clearForm = function(){
	$("#dataForm").form('clear');
	$("#dataForm input").removeAttr("readonly").removeClass("disabled");
};

//新增对话框
appVersion.addInfo = function() {
	appVersion.clearForm();
	ygDialog({
		title:'新增',
		target:$('#myFormPanel'),
		width:780,
		height:300,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(dialog){
				appVersion.do_save(dialog);
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(dialog){
				appVersion.clearForm();
				dialog.close();
			}
		}]
	});
};


appVersion.checkExistFun = function(url,checkColumnJsonData){
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
appVersion.do_save = function(dialog) {
	var fromObj = $('#dataForm');
	//1.校验必填项
	var validateForm = fromObj.form('validate');
	if (validateForm == false) {
		return;
	}
	//2.检验是否有重复记录((1)主键不重复(如果是序列生成就不用),(2)名称不能重复等等)
	var checkUrl = BasePath + '/system/app_version/get_count.json';
	var checkDataNo = {
		"versionNo" : $("#versionNo").val()
	};
	if (appVersion.checkExistFun(checkUrl, checkDataNo)) {
		showError('登录用户名已存在,不能重复!');
		$("#versionNo").focus();
		return;
	}

	//3. 保存
	var url = BasePath + '/system/app_version/post';
	fromObj.form('submit', {
		url : url,
		success : function() {
			//4.保存成功,清空表单
			showSuc('新增成功!');
			$("#myFormPanel").window('close');
			appVersion.clearForm();
			appVersion.loadDataGrid();
			return;
		},
		error : function() {
			showError('新增失败,请联系管理员!');
		}
	});
};

//删除
appVersion.delInfo = function() {
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
						keyno.cartypeNo = item.cartypeNo;
						keyStr.push(keyno);
					});
					//2.绑定数据
					var url = BasePath + '/system/app_version/save';
					var data = {
						deleted : JSON.stringify(keyStr),
					};
					//3. 删除
					ajaxRequest(url, data, function(result) {
						if (result) {
							//4.删除成功,清空表单
							showSuc('删除成功!');
							appVersion.loadDataGrid();
						} else {
							showError('删除失败,请联系管理员!');
						}
					});
				}
			});
};

appVersion.editInfo = function(cartypeNo){
	var checkedRows = $("#dataGridJG").datagrid("getChecked");// 获取所有勾选checkbox的行
	if (checkedRows.length < 1) {
		showWarn('请选择要修改的记录!',1);
		return;
	}else if(checkedRows.length>1){
		showWarn('只能修改一条记录!',1);
		return;
	}else{
		appVersion.clearForm();
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
					appVersion.do_update(dialog);
				}
			},{
				text:'取消',
				iconCls:'icon-cancel',
				handler:function(dialog){
					appVersion.clearForm();
					dialog.close();
				}
			}]
		});
	}
};

appVersion.loadDetail = function(rowData){
	$('#dataForm').form('load',rowData);
	$("#dataForm input").addClass("disabled").attr("readonly",true);
	ygDialog({
		title:'详情',
		target:$('#myFormPanel'),
		width:780,
		height:300,
	});
};
appVersion.do_update = function(dialog) {
	var fromObj = $('#dataForm');
	//1.校验必填项
	var validateForm = fromObj.form('validate');
	if (validateForm == false) {
		return;
	}
	//3. 保存
	var url = BasePath + '/system/app_version/put';
	fromObj.form('submit', {
		url : url,
		success : function() {
			//4.保存成功,清空表单
			showSuc('修改成功!');
			$("#myFormPanel").window('close');
			appVersion.clearForm();
			appVersion.loadDataGrid();
			return;
		},
		error : function() {
			showError('修改失败,请联系管理员!');
		}
	});
};

//导出
appVersion.exportExcel=function(){
	exportExcelBaseInfo('dataGridJG','/system/app_version/do_export.htm','系统用户信息导出');
};


