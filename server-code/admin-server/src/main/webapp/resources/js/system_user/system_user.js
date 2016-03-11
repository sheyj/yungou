var systemUser = {};


systemUser.statusData = [ {
	"value" : '1',
	"text" : '正常'
}, {
	"value" : '2',
	"text" : '锁定'
} ];

//
systemUser.initcombobox = function() {
	$('#statusCondition').combobox({
		valueField : "value",
		textField : "text",
		data : systemUser.statusData,
		panelHeight : "auto",
		editable : false
	});
};

$(document).ready(function() {
	systemUser.initcombobox();
});


systemUser.loadDataGrid = function(){
	$('#dataGridJG').datagrid({
		'url':BasePath+'/system/system_user/list.json',
		'title':'系统用户维护',
		'pageNumber':1 
		});
};



//查询公司资料信息
systemUser.searchInfo = function(){
	var queryParams=$('#searchForm').form('getData');
	var queryMxURL=BasePath+'/system/system_user/list.json';
   // 3.加载明细
    $( "#dataGridJG").datagrid( 'options' ).queryParams= queryParams;
    $( "#dataGridJG").datagrid( 'options' ).url=queryMxURL;
    $( "#dataGridJG").datagrid( 'load' );
    
};

//清楚查询条件
systemUser.searchClear = function(){
	$('#searchForm').form("clear");
};

//清空表单
systemUser.clearForm = function(){
	$("#dataForm").form('clear');
	$("#dataForm input").removeAttr("readonly").removeClass("disabled");
};

//新增对话框
systemUser.addInfo = function() {
	systemUser.clearForm();
	ygDialog({
		title:'新增',
		target:$('#myFormPanel'),
		width:780,
		height:300,
		buttons:[{
			text:'保存',
			iconCls:'icon-save',
			handler:function(dialog){
				systemUser.do_save(dialog);
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(dialog){
				systemUser.clearForm();
				dialog.close();
			}
		}]
	});
};


systemUser.checkExistFun = function(url,checkColumnJsonData){
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
systemUser.do_save = function(dialog) {
	var fromObj = $('#dataForm');
	//1.校验必填项
	var validateForm = fromObj.form('validate');
	if (validateForm == false) {
		return;
	}
	//2.检验是否有重复记录((1)主键不重复(如果是序列生成就不用),(2)名称不能重复等等)
	var checkUrl = BasePath + '/system/system_user/get_count.json';
	var checkDataNo = {
		"loginName" : $("#loginName").val()
	};
	if (systemUser.checkExistFun(checkUrl, checkDataNo)) {
		showError('登录用户名已存在,不能重复!');
		$("#loginName").focus();
		return;
	}

	//3. 保存
	var url = BasePath + '/system/system_user/add';
	fromObj.form('submit', {
		url : url,
		success : function() {
			//4.保存成功,清空表单
			showSuc('新增成功!');
			$("#myFormPanel").window('close');
			systemUser.clearForm();
			systemUser.loadDataGrid();
			return;
		},
		error : function() {
			showError('新增失败,请联系管理员!');
		}
	});
};

//删除
systemUser.delInfo = function() {
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
					var url = BasePath + '/system/system_user/save';
					var data = {
						deleted : JSON.stringify(keyStr),
					};
					//3. 删除
					systemUser.ajaxRequest(url, data, function(result) {
						if (result) {
							//4.删除成功,清空表单
							showSuc('删除成功!');
							systemUser.loadDataGrid();
						} else {
							showError('删除失败,请联系管理员!');
						}
					});
				}
			});
};

systemUser.editInfo = function(cartypeNo){
	var checkedRows = $("#dataGridJG").datagrid("getChecked");// 获取所有勾选checkbox的行
	if (checkedRows.length < 1) {
		showWarn('请选择要修改的记录!',1);
		return;
	}else if(checkedRows.length>1){
		showWarn('只能修改一条记录!',1);
		return;
	}else{
		systemUser.clearForm();
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
					systemUser.do_update(dialog);
				}
			},{
				text:'取消',
				iconCls:'icon-cancel',
				handler:function(dialog){
					systemUser.clearForm();
					dialog.close();
				}
			}]
		});
	}
};

systemUser.loadDetail = function(rowData){
	$('#dataForm').form('load',rowData);
	$("#dataForm input").addClass("disabled").attr("readonly",true);
	ygDialog({
		title:'详情',
		target:$('#myFormPanel'),
		width:780,
		height:300,
	});
};
systemUser.do_update = function(dialog) {
	var fromObj = $('#dataForm');
	//1.校验必填项
	var validateForm = fromObj.form('validate');
	if (validateForm == false) {
		return;
	}
	//3. 保存
	var url = BasePath + '/system/system_user/put';
	fromObj.form('submit', {
		url : url,
		success : function() {
			//4.保存成功,清空表单
			showSuc('修改成功!');
			$("#myFormPanel").window('close');
			systemUser.clearForm();
			systemUser.loadDataGrid();
			return;
		},
		error : function() {
			showError('修改失败,请联系管理员!');
		}
	});
};

//导出
systemUser.exportExcel=function(){
	exportExcelBaseInfo('dataGridJG','/system/system_user/do_export.htm','系统用户信息导出');
};


