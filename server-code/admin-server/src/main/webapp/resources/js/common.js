var commonValidRule = {};

/**
 * 验证是否是中文
 */
commonValidRule.isChineseChar = function(str) {
	var reg = /^[\u4e00-\u9fa5]+$/gi;
	if (reg.test(str)) {
		return true;
	}
	return false;
};

/**
 * 不能包含中文验证
 */
commonValidRule.vnChinese = {
	vnChinese : {
		validator : function(value, param) {
			for ( var i = 0; i < value.length; i++) {
				if (commonValidRule.isChineseChar(value[i])) {
					return false;
				}
			}
			return true;
		},
		message : '{0}'
	}
};

/**
 * 长度验证
 */
commonValidRule.vLength = {
	vLength : {
		validator : function(value, param) {
			var chineseCharLength = param[3] || 1;
			var tempLength = 0;
			for ( var i = 0; i < value.length; i++) {
				if (commonValidRule.isChineseChar(value[i])) {
					tempLength += chineseCharLength;
				} else {
					tempLength += 1;
				}
			}
			if (tempLength < param[0] || tempLength > param[1]) {
				return false;
			}
			return true;
		},
		message : '{2}'
	}
};

$(document).ready(function() {
	$.extend($.fn.validatebox.defaults.rules, commonValidRule.vnChinese);
	$.extend($.fn.validatebox.defaults.rules, commonValidRule.vLength);
});

parseParam = function(param) {
	var paramStr = "";
	{
		$.each(param, function(i) {
			paramStr += '&' + i + '=' + param[i];
		});
	}
	return paramStr.substr(1);
};

/**
 * 基础资料的导出
 * 
 * @param dataGridId
 *            导出数据的表格ID
 * @param exportUrl
 *            导出数据的URL 基础资料一般都是 /模块名/do_export.htm *如机构:/store/do_export.htm
 * @param excelTitle
 *            excel文件名
 */
function exportExcelBaseInfo(dataGridId, exportUrl, excelTitle) {
	var $dg = $("#" + dataGridId + "");

	var params = $dg.datagrid('options').queryParams;
	var grepColumns = $dg.datagrid('options').columns;

	var columns = $.grep(grepColumns[0], function(o, i) {
		if ($(o).attr("notexport") == true) {
			return true;
		}
		return false;
	}, true);

	var exportColumns = JSON.stringify(columns);
	var url = BasePath + exportUrl;

	// if(exportUrl.indexOf('?')>0){
	// url=BasePath+exportUrl+'&'+queryParam;
	// }else{
	// url=BasePath+exportUrl+'?'+queryParam;
	// }

	var dataRow = $dg.datagrid('getRows');

	$("#exportExcelForm").remove();

	$("<form id='exportExcelForm'  method='post'></form>").appendTo("body");

	var fromObj = $('#exportExcelForm');

	if (dataRow.length > 0) {
		fromObj.form('submit', {
			url : url,
			onSubmit : function(param) {

				param.exportColumns = exportColumns;
				param.fileName = excelTitle;

				if (params != null && params != {}) {
					$.each(params, function(i) {
						param[i] = params[i];
					});
				}

			},
			success : function() {

			}
		});
	} else {
		alert('查询记录为空，不能导出!', 1);
	}

}

/**
 * 订单功能的导出
 * 
 * @param dataGridId
 *            表格ID
 * @param sysNo
 *            品牌库的ID
 * @param preColNames
 *            前面显示业务列 公用查询动态生成的参数
 * @param endColNames
 *            后面显示的业务列
 * @param sizeTypeFiledName
 * @param excelTitle
 *            excel文件名
 */
function exportExcelBill(dataGridId, sysNo, preColNames, endColNames,
		sizeTypeFiledName, excelTitle) {

	var url = BasePath + '/initCache/do_export.htm';

	var $dg = $("#" + dataGridId + "");

	$("#exportExcelForm").remove();

	$("<form id='exportExcelForm'  method='post'></form>").appendTo("body");

	var fromObj = $('#exportExcelForm');

	var dataRow = $dg.datagrid('getRows');

	if (dataRow.length > 0) {
		fromObj.form('submit', {
			url : url,
			onSubmit : function(param) {

				param.sysNo = sysNo;
				param.preColNames = JSON.stringify(preColNames);
				param.endColNames = JSON.stringify(endColNames);
				param.sizeTypeFiledName = sizeTypeFiledName;
				param.fileName = excelTitle;
				param.dataRow = JSON.stringify(dataRow);
			},
			success : function() {

			}
		});
	} else {
		alert('数据为空，不能导出!', 1);
	}

}
/**
 * 下单下单公用方法
 * 
 * @param dataGridId
 * @param rowIndex
 * @param type
 *            1--上单 2--下单
 * @param callBack
 *            回调函数名
 */
function preBill(dataGridId, rowIndex, type, callBack) {
	var $dg = $("#" + dataGridId + "");
	var curRowIndex = rowIndex;

	var options = $dg.datagrid('getPager').data("pagination").options;
	var currPage = options.pageNumber;
	var total = options.total;
	var max = Math.ceil(total / options.pageSize);
	var lastIndex = Math.ceil(total % options.pageSize);
	var pageSize = options.pageSize;
	var rowData = [];
	if (type == 1) {
		if (curRowIndex != 0) {
			curRowIndex = curRowIndex - 1;
			$dg.datagrid('unselectAll');
			$dg.datagrid('selectRow', curRowIndex);
			var rows = $dg.datagrid('getRows');
			if (rows) {
				rowData = rows[curRowIndex];
			}

			callBack(curRowIndex, rowData);
		} else { // 跳转到上一页的最后一行
			if (currPage <= 1) {
				$dg.datagrid('unselectAll');
				$dg.datagrid('selectRow', curRowIndex);
				callBack(curRowIndex, null);
			} else {
				$dg.datagrid('getPager').pagination({
					pageSize : options.pageSize,
					pageNumber : (currPage - 1)
				});
				$dg.datagrid('getPager').pagination('select', currPage - 1);

				curRowIndex = pageSize - 1;
				$dg.datagrid({
					onLoadSuccess : function(data) {
						if (type == 1) {
							$dg.datagrid('unselectAll');
							$dg.datagrid('selectRow', curRowIndex);
							var rows = $dg.datagrid('getRows');
							if (rows) {
								rowData = rows[curRowIndex];
							}
							callBack(curRowIndex, rowData);
						}

					}
				});

			}
		}
	} else if (type == 2) {

		if (curRowIndex != (pageSize - 1)) {
			if (currPage == max && lastIndex != 0
					&& curRowIndex == (lastIndex - 1)) {
				$dg.datagrid('unselectAll');
				$dg.datagrid('selectRow', curRowIndex);
				callBack(curRowIndex, null);
			} else {
				curRowIndex = curRowIndex + 1;
				$dg.datagrid('unselectAll');
				$dg.datagrid('selectRow', curRowIndex);
				var rows = $dg.datagrid('getRows');
				if (rows) {
					rowData = rows[curRowIndex];
				}

				callBack(curRowIndex, rowData);
			}

		} else {

			if (currPage >= max) {
				$dg.datagrid('unselectAll');
				$dg.datagrid('selectRow', curRowIndex);
				callBack(curRowIndex, null);
			} else {
				$dg.datagrid('getPager').pagination({
					pageSize : options.pageSize,
					pageNumber : (currPage + 1)
				});
				$dg.datagrid('getPager').pagination('select', currPage + 1);

				curRowIndex = 0;
				$dg.datagrid({
					onLoadSuccess : function(data) {
						if (type == 2) {

							$dg.datagrid('unselectAll');
							$dg.datagrid('selectRow', curRowIndex);
							var rows = $dg.datagrid('getRows');
							if (rows) {
								rowData = rows[curRowIndex];
							}
							callBack(curRowIndex, rowData);
						}

					}
				});
			}
		}

	}
}

/**
 * http方法静态变量
 */
var HttpMethod={
		LIST_JSON:"list.json",//获取列表
		GET_COUNT:"get_count.json",//获取数量
		GET:"get",//获取
		GET2:"get2",//获取拓展信息
		GET_BIZ:"get_biz",//list
		POST:"post",//增加
		POST2:"post2",//增加2
		PUT:"put",//更新
		DELETE:"delete",//删
		SAVE:"save",//增删改
		DO_EXPORT:"do_export.htm",//导出excel
		VERIFY:"verify",
		IMPORT:"import"
};

var  ShowMessage={
		ADD_SUCCESS:"新增成功！",
		ADD_ERROR:"新增失败,请联系管理员！",
		DELETE_SUCCESS:"删除成功！",
		DELETE_ERROR:"删除失败,请联系管理员！",
		UPDATE_SUCCESS:"更新成功！",
		UPDATE_ERROR:"更新失败,请联系管理员！",
		OPERAT_SUCCESS:"操作成功！",
		OPERAT_ERROR:"操作失败，请联系管理员！",
		ADUIT_SUCCESS:"审核成功！",
		ADUIT_ERROR:"审核失败，请联系管理员"
};

//重新加载数据到datagrid
function loadDataToGrid(dataGridId, url, queryParams,callback) {
	var $dg = $('#' + dataGridId);
	$dg.datagrid('options').queryParams = queryParams;
	$dg.datagrid('options').url = url;
	if(callback){
		$dg.datagrid({onLoadSuccess:callback});
	}
	$dg.datagrid('load');
};

//清空表格中的数据
function deleteAllGridCommon(datagridId){
	$('#'+datagridId).datagrid('loadData', { total: 0, rows: [] });
}

$.extend($.fn.datagrid.defaults.editors, {    
    textsearch: {    
        init: function(container, options){
						var div=$('<div class="ipt-search-box"></div>');
						var input = $('<input type="text" class="datagrid-editable-input ipt" style="background:#fff"/>').appendTo(div);   
						var i=$('<i>').appendTo(div);
						div.css({width:input.width()+4,margin:'auto'});
						div.appendTo(container);
						
						if(options.readOnly){
							input.addClass('readonly').attr('readonly',true);
						}
						
						if(options.validatebox){
							input.validatebox(options.validatebox.options);
						}
						
						i.bind('click',function(){
							if(typeof options.clickFn=="string"){
								eval(options.clickFn + "()");
							}
						});
						   
            return input;    
        },    
        getValue: function(target){ 
            return $(target).val();    
        },    
        setValue: function(target, value){
        	$(target).val(value);  
        },    
        resize: function(target, width){    
					$(target)._outerWidth(width)._outerHeight(22);
					$(target).parent()._outerWidth(width);
        }    
    }
});

function dgSelector(opts){
	var _url=opts.href || '';
	var _title=opts.title;
	var _w=opts.width || null;
	var _h=opts.height || null;
	var iframe=opts.isFrame;
	if(typeof iframe=="undefined"){
		iframe=true;
	}
	top.dgSelectorOpts=opts;
	
	ygDialog({
		title:_title,
		href:_url,
		width:_w,
		height:_h,
		isFrame:iframe,
		modal:true,
		showMask: true,
		onLoad:function(win, content){
				var tb=content.tbgrid;
				var _this=$(this);
				
				if(tb==null){
					tb=opts.tbGrid || $('#dialog_SearchDataGrid');
				}
				
				if(opts.queryUrl!=null){
					var searchBtn=$('#dgSelectorSearchBtn');
					var clearBtn=$('#dgSelectorClearBtn');
					var confirmBtn=$('#dgSelectorConfirmBtn');
					var recoveryBtn=$('#dgSelectorRecoveryBtn');
					searchBtn.click(function(){
									var targetForm=$('#dialog_SarchForm');
									tb.datagrid('options').queryParams = targetForm.form('getData');
									tb.datagrid('options').url = opts.queryUrl;
									tb.datagrid('load');
					});
					
					clearBtn.click(function(){
							$('#dialog_SarchForm').form('clear');
						});
					if(typeof top.dgSelectorOpts.recoveryFn=="function"){
						recoveryBtn.click(function(){							
							var reqParam = {};
							ajaxRequest(opts.recoveryUrl,reqParam,function(ret){
								if(ret.rows.length<1){
									showInfo("没找到通用条件的值");
									return;
								}
								top.dgSelectorOpts.recoveryFn(ret.rows);								
							});	
							win.close();												
						});
					}	
					else{
						recoveryBtn.remove();
					}
					
					if(confirmBtn){
						confirmBtn.click(function(){
							var rowsData=tb.datagrid('getSelections');
							debug(rowsData.length);
							if(rowsData.length<=0){
								showWarn('请选择后再操作！');
								return false;
							}
							if(typeof top.dgSelectorOpts.fn=="function"){
								top.dgSelectorOpts.fn(rowsData);
							}
							win.close();
						});
					}
					
				}				
				if(typeof top.dgSelectorOpts.remenberFn !="function"){
					$("#check-remenber").remove();
					$("#lable-remenber").remove();
				}
				if(opts.disableDblClick){
					return;
				}
				tb.datagrid({
					onDblClickRow:function(rowIndex, rowData){
						if(typeof top.dgSelectorOpts.fn=="function"){
							top.dgSelectorOpts.fn(rowData,rowIndex);
							if($(top.iptSearchInputObj)[0]&&$(top.iptSearchInputObj).hasClass('easyui-validatebox')){
								$(top.iptSearchInputObj).validatebox('validate');
							}
						}
						var remenberBtn = document.getElementById("check-remenber");
						if(null !=remenberBtn && remenberBtn.checked){
							var rowsData=tb.datagrid('getSelections');
							top.dgSelectorOpts.remenberFn(rowsData);														
						}
						win.close();
					},
					onLoadSuccess:function(){
						$('input[name=optsel]',_this.contents()).on('click',function(){
							var _idx=$('input[name=optsel]',_this.contents()).index(this);
							var row=tb.datagrid('getRows')[_idx];
							if(typeof top.dgSelectorOpts.fn=="function"){
								top.dgSelectorOpts.fn(row);
								if($(top.iptSearchInputObj)[0] &&$(top.iptSearchInputObj).hasClass('easyui-validatebox')){
									$(top.iptSearchInputObj).validatebox('validate');
								}
							}
							win.close();
					});
					}
					
				});
		}
	});
	return false;
}

/**
 * 模块选择对话框
 * 
 * @param opts
 * @returns {Boolean}
 */
function moduleSelector(opts) {
    var _url = opts.href || '';
    var _title = opts.title;
    var _w = opts.width || null;
    var _h = opts.height || null;
    var iframe = opts.isFrame;
    if (typeof iframe == "undefined") {
        iframe = true;
    }
    top.dgSelectorOpts = opts;
    ygDialog({
        title: _title,
        href: _url,
        width: _w,
        height: _h,
        isFrame: iframe,
        modal: true,
        showMask: true,
        onLoad: function (win, content) {
            var confirmBtn = $('#dgSelectorConfirmBtn');
            if (confirmBtn) {
                confirmBtn.click(function () {
                    var data = $('#moduleTree').tree('getChecked');
                    if (data.length <= 0) {
                        showWarn('请选择后再操作！');
                        return false;
                    }
                    var queryMxURL = BasePath + '/condition_module_custom/save';
                    var condition = $.map(data, function (o) {
                        if (o.children == null) {
                            return '{"moduleId":"' + o.id + '","conditionType":"' + opts.conditionType + '","moduleName":"' + o.text + '"}';
                        }
                    });
                    var reqParam = {
                        "inserted": "[" + condition.toString() + "]"
                    };
                    ajaxRequest(queryMxURL, reqParam, function (result) {
                        if (result.success) {
                            showSuc('保存成功!');
                            if (typeof top.dgSelectorOpts.fn == "function") {
                                top.dgSelectorOpts.fn();
                            }
                        } else {
                            showError('保存失败,请联系管理员!');
                        }
                    });

                    win.close();
                });
            }

        }
    });
    return false;
}
var moduleId = getParamFromUrl("moduleId");
/*
 * 选择供应商
 */
function supplierSelector(opts) {
    var _url = opts.href || '';
    var _title = opts.title;
    var _w = opts.width || null;
    var _h = opts.height || null;
    var iframe = opts.isFrame;
    if (typeof iframe == "undefined") {
        iframe = true;
    }
    top.dgSelectorOpts = opts;

    ygDialog({
        title: _title,
        href: _url,
        width: _w,
        height: _h,
        isFrame: iframe,
        modal: true,
        showMask: true,
        onLoad: function (win, content) {
            var tb = content.tbgrid;
            var _this = $(this);

            if (tb == null) {
                tb = opts.tbGrid || $('#dialog_SearchDataGrid');
            }

            if (opts.queryUrl != null) {
                var searchBtn = $('#dgSelectorSearchBtn');
                var clearBtn = $('#dgSelectorClearBtn');
                var confirmBtn = $('#dgSelectorConfirmBtn');
                var recoveryBtn = $('#dgSelectorRecoveryBtn');
                searchBtn.click(function () {
                    var targetForm = $('#dialog_SarchForm');
                    tb.datagrid('options').queryParams = targetForm.form('getData');
                    tb.datagrid('options').url = opts.queryUrl;
                    tb.datagrid('load');
                });

                clearBtn.click(function () {
                    $('#dialog_SarchForm').form('clear');
                });
                recoveryBtn.click(function () {
                    var reqParam = {};
                    var recoveryUrl = BasePath + '/condition_supplier/list.json';
                    ajaxRequest(recoveryUrl, reqParam, function (ret) {
                        var rowsData = ret.rows;
                        if (rowsData.length < 1) {
                            showInfo("没找到通用条件的值");
                            return;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData[0]);
                        }
                    });
                    win.close();
                });

                if (confirmBtn) {
                    confirmBtn.click(function () {
                        var rowsData = tb.datagrid('getSelections');
                        if (rowsData.length <= 0) {
                            showWarn('请选择后再操作！');
                            return false;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData);
                        }
                        win.close();
                    });
                }

            }

            tb.datagrid({
                onDblClickRow: function (rowIndex, rowData) {
                    if (typeof top.dgSelectorOpts.fn == "function") {
                        top.dgSelectorOpts.fn(rowData, rowIndex);
                        if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                            $(top.iptSearchInputObj).validatebox('validate');
                        }
                    }
                    var remenberBtn = document.getElementById("check-remenber");
                    if (null != remenberBtn && remenberBtn.checked) {
                        console.info(rowData);
                        var condition = '{"supplierNo":"' + rowData.supplierNo + '","supplierName":"' + rowData.supplierName + '"}';
                        var queryMxURL = BasePath + '/condition_supplier/remenber?moduleId=' + moduleId;
                        var reqParam = {
                            "inserted": "[" + condition + "]"
                        };
                        ajaxRequest(queryMxURL, reqParam, function (ret) {});
                    }
                    win.close();
                },
                onLoadSuccess: function () {
                    $('input[name=optsel]', _this.contents()).on('click', function () {
                        var _idx = $('input[name=optsel]', _this.contents()).index(this);
                        var row = tb.datagrid('getRows')[_idx];
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(row);
                            if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                                $(top.iptSearchInputObj).validatebox('validate');
                            }
                        }
                        win.close();
                    });
                }

            });
        }
    });
    return false;
}

/*
 * 选择机构
 */
function storeSelector(opts) {
    var _url = opts.href || '';
    var _title = opts.title;
    var _w = opts.width || null;
    var _h = opts.height || null;
    var iframe = opts.isFrame;
    if (typeof iframe == "undefined") {
        iframe = true;
    }
    top.dgSelectorOpts = opts;

    ygDialog({
        title: _title,
        href: _url,
        width: _w,
        height: _h,
        isFrame: iframe,
        modal: true,
        showMask: true,
        onLoad: function (win, content) {
            var tb = content.tbgrid;
            var _this = $(this);

            if (tb == null) {
                tb = opts.tbGrid || $('#dialog_SearchDataGrid');
            }

            if (opts.queryUrl != null) {
                var searchBtn = $('#dgSelectorSearchBtn');
                var clearBtn = $('#dgSelectorClearBtn');
                var confirmBtn = $('#dgSelectorConfirmBtn');
                var recoveryBtn = $('#dgSelectorRecoveryBtn');
                searchBtn.click(function () {
                    var targetForm = $('#dialog_SarchForm');
                    tb.datagrid('options').queryParams = targetForm.form('getData');
                    tb.datagrid('options').url = opts.queryUrl;
                    tb.datagrid('load');
                });

                clearBtn.click(function () {
                    $('#dialog_SarchForm').form('clear');
                });
                recoveryBtn.click(function () {
                    var reqParam = {};
                    var recoveryUrl = BasePath + '/condition_store/list.json';
                    ajaxRequest(recoveryUrl, reqParam, function (ret) {
                        var rowsData = ret.rows;
                        if (rowsData.length < 1) {
                            showInfo("没找到通用条件的值");
                            return;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData[0]);
                        }
                    });
                    win.close();
                });

                if (confirmBtn) {
                    confirmBtn.click(function () {
                        var rowsData = tb.datagrid('getSelections');
                        if (rowsData.length <= 0) {
                            showWarn('请选择后再操作！');
                            return false;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData);
                        }
                        win.close();
                    });
                }

            }

            tb.datagrid({
                onDblClickRow: function (rowIndex, rowData) {
                    if (typeof top.dgSelectorOpts.fn == "function") {
                        top.dgSelectorOpts.fn(rowData, rowIndex);
                        if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                            $(top.iptSearchInputObj).validatebox('validate');
                        }
                    }
                    var remenberBtn = document.getElementById("check-remenber");
                    if (null != remenberBtn && remenberBtn.checked) { 
                        var condition = '{"storeNo":"' + rowData.storeNo + '","storeName":"' + rowData.storeName + '"}';
                        var queryMxURL = BasePath + '/condition_store/remenber?moduleId=' + moduleId;
                        var reqParam = {
                            "inserted": "[" + condition + "]"
                        };                         
                        ajaxRequest(queryMxURL, reqParam, function (ret) {});
                    }
                    win.close();
                },
                onLoadSuccess: function () {
                    $('input[name=optsel]', _this.contents()).on('click', function () {
                        var _idx = $('input[name=optsel]', _this.contents()).index(this);
                        var row = tb.datagrid('getRows')[_idx];
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(row);
                            if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                                $(top.iptSearchInputObj).validatebox('validate');
                            }
                        }
                        win.close();
                    });
                }

            });
        }
    });
    return false;
}

/**
 * 通用条件查询类型定义
 */
var ConditionType = {
    Supplier: 1,
    Store: 2,
    Item: 3,
    Brand: 4,
	Zone: 5
};

/*
 * 选择品牌
 */
function brandSelector(opts) {
    var _url = opts.href || '';
    var _title = opts.title;
    var _w = opts.width || null;
    var _h = opts.height || null;
    var iframe = opts.isFrame;
    if (typeof iframe == "undefined") {
        iframe = true;
    }
    top.dgSelectorOpts = opts;

    ygDialog({
        title: _title,
        href: _url,
        width: _w,
        height: _h,
        isFrame: iframe,
        modal: true,
        showMask: true,
        onLoad: function (win, content) {
            var tb = content.tbgrid;
            var _this = $(this);

            if (tb == null) {
                tb = opts.tbGrid || $('#dialog_SearchDataGrid');
            }

            if (opts.queryUrl != null) {
                var searchBtn = $('#dgSelectorSearchBtn');
                var clearBtn = $('#dgSelectorClearBtn');
                var confirmBtn = $('#dgSelectorConfirmBtn');
                var recoveryBtn = $('#dgSelectorRecoveryBtn');
                searchBtn.click(function () {
                    var targetForm = $('#dialog_SarchForm');
                    tb.datagrid('options').queryParams = targetForm.form('getData');
                    tb.datagrid('options').url = opts.queryUrl;
                    tb.datagrid('load');
                });

                clearBtn.click(function () {
                    $('#dialog_SarchForm').form('clear');
                });
                recoveryBtn.click(function () {
                    var reqParam = {};
                    var recoveryUrl = BasePath + '/condition_brand/list.json';
                    ajaxRequest(recoveryUrl, reqParam, function (ret) {
                        var rowsData = ret.rows;
                        if (rowsData.length < 1) {
                            showInfo("没找到通用条件的值");
                            return;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData[0]);
                        }
                    });
                    win.close();
                });

                if (confirmBtn) {
                    confirmBtn.click(function () {
                        var rowsData = tb.datagrid('getSelections');
                        if (rowsData.length <= 0) {
                            showWarn('请选择后再操作！');
                            return false;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData);
                        }
                        win.close();
                    });
                }

            }

            tb.datagrid({
                onDblClickRow: function (rowIndex, rowData) {
                    if (typeof top.dgSelectorOpts.fn == "function") {
                        top.dgSelectorOpts.fn(rowData, rowIndex);
                        if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                            $(top.iptSearchInputObj).validatebox('validate');
                        }
                    }
                    var remenberBtn = document.getElementById("check-remenber");
                    if (null != remenberBtn && remenberBtn.checked) { 
                        var condition = '{"brandNo":"' + rowData.brandNo + '","brandName":"' + rowData.brandName + '"}';
                        var queryMxURL = BasePath + '/condition_brand/remenber?moduleId=' + moduleId;
                        var reqParam = {
                            "inserted": "[" + condition + "]"
                        };                         
                        ajaxRequest(queryMxURL, reqParam, function (ret) {});
                    }
                    win.close();
                },
                onLoadSuccess: function () {
                    $('input[name=optsel]', _this.contents()).on('click', function () {
                        var _idx = $('input[name=optsel]', _this.contents()).index(this);
                        var row = tb.datagrid('getRows')[_idx];
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(row);
                            if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                                $(top.iptSearchInputObj).validatebox('validate');
                            }
                        }
                        win.close();
                    });
                }

            });
        }
    });
    return false;
}
/*
 * 选择地区
 */
function zoneSelector(opts) {
    var _url = opts.href || '';
    var _title = opts.title;
    var _w = opts.width || null;
    var _h = opts.height || null;
    var iframe = opts.isFrame;
    if (typeof iframe == "undefined") {
        iframe = true;
    }
    top.dgSelectorOpts = opts;

    ygDialog({
        title: _title,
        href: _url,
        width: _w,
        height: _h,
        isFrame: iframe,
        modal: true,
        showMask: true,
        onLoad: function (win, content) {
            var tb = content.tbgrid;
            var _this = $(this);

            if (tb == null) {
                tb = opts.tbGrid || $('#dialog_SearchDataGrid');
            }

            if (opts.queryUrl != null) {
                var searchBtn = $('#dgSelectorSearchBtn');
                var clearBtn = $('#dgSelectorClearBtn');
                var confirmBtn = $('#dgSelectorConfirmBtn');
                var recoveryBtn = $('#dgSelectorRecoveryBtn');
                searchBtn.click(function () {
                    var targetForm = $('#dialog_SarchForm');
                    tb.datagrid('options').queryParams = targetForm.form('getData');
                    tb.datagrid('options').url = opts.queryUrl;
                    tb.datagrid('load');
                });

                clearBtn.click(function () {
                    $('#dialog_SarchForm').form('clear');
                });
                recoveryBtn.click(function () {
                    var reqParam = {};
                    var recoveryUrl = BasePath + '/condition_zone/list.json';
                    ajaxRequest(recoveryUrl, reqParam, function (ret) {
                        var rowsData = ret.rows;
                        if (rowsData.length < 1) {
                            showInfo("没找到通用条件的值");
                            return;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData[0]);
                        }
                    });
                    win.close();
                });

                if (confirmBtn) {
                    confirmBtn.click(function () {
                        var rowsData = tb.datagrid('getSelections');
                        if (rowsData.length <= 0) {
                            showWarn('请选择后再操作！');
                            return false;
                        }
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(rowsData);
                        }
                        win.close();
                    });
                }

            }

            tb.datagrid({
                onDblClickRow: function (rowIndex, rowData) {
                    if (typeof top.dgSelectorOpts.fn == "function") {
                        top.dgSelectorOpts.fn(rowData, rowIndex);
                        if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                            $(top.iptSearchInputObj).validatebox('validate');
                        }
                    }
                    var remenberBtn = document.getElementById("check-remenber");
                    if (null != remenberBtn && remenberBtn.checked) { 
                        var condition = '{"zoneNo":"' + rowData.zoneNo + '","zoneName":"' + rowData.brandName + '"}';
                        var queryMxURL = BasePath + '/condition_zone/remenber?moduleId=' + moduleId;
                        var reqParam = {
                            "inserted": "[" + condition + "]"
                        };                         
                        ajaxRequest(queryMxURL, reqParam, function (ret) {});
                    }
                    win.close();
                },
                onLoadSuccess: function () {
                    $('input[name=optsel]', _this.contents()).on('click', function () {
                        var _idx = $('input[name=optsel]', _this.contents()).index(this);
                        var row = tb.datagrid('getRows')[_idx];
                        if (typeof top.dgSelectorOpts.fn == "function") {
                            top.dgSelectorOpts.fn(row);
                            if ($(top.iptSearchInputObj)[0] && $(top.iptSearchInputObj).hasClass('easyui-validatebox')) {
                                $(top.iptSearchInputObj).validatebox('validate');
                            }
                        }
                        win.close();
                    });
                }

            });
        }
    });
    return false;
}
/*--获取网页传递的参数--*/
function getParamFromUrl(paras)
{ 
    var url = location.href; 
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
    var paraObj = {};
    for (i=0; j=paraString[i]; i++){ 
    paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    } 
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined"){ 
    return ""; 
    }else{ 
    return returnValue; 
    } 
}
function main_recovery(){
	recoverySupplier();
	recoveryStore();
}
/**
 * 恢复供应商
 * @param moduleId 模块ID
 */
function recoverySupplier(){
	url = BasePath + '/condition_supplier/list.json';
	var param = {
			moduleId: moduleId
	};
	ajaxRequest(url, param,function(ret){
		var rows = ret.rows;
		if(rows != undefined){
			if(rows.length>1){
				showInfo("通用条件的值不唯一，请重新选择");
				return;
			}
			var data = rows[0];
			$('#supplierNoBox').val(data.supplierNo);
			$('#supplierNoBoxStr').val(
					data.supplierNo + '→' + data.supplierName);
		}		
	});
}
/**
 * 恢复机构
 * @param moduleId
 */
function recoveryStore(){
    var url = BasePath + '/condition_store/list.json';
	var param = {
			moduleId: moduleId
	};
 	ajaxRequest(url, param,function(ret){
		var rows = ret.rows;
		if(rows != undefined ){
			if(rows.length>1){
				showInfo("通用条件的值不唯一，请重新选择");
				return;
			}
			var data = rows[0];
			$('#storeNoBox').val(data.storeNo);
			$('#storeNoBoxStr').val(
					data.storeNo + '→' + data.storeName);
		}		
	});
}
function recoveryBrand(){
	var url = BasePath + '/condition_brand/list.json';
	var param = {
			moduleId: moduleId
	};
 	ajaxRequest(url, param,function(ret){
		var rows = ret.rows;
		if(rows != undefined ){
			if(rows.length>1){
				showInfo("通用条件的值不唯一，请重新选择");
				return;
			}
			var data = rows[0];
			$('#brandName').val(data.brandNo + '→' + data.brandName);
			$('#brandNo').val(data.brandNo);
		}		
	});
}
function recoveryZone(){
	var url = BasePath + '/condition_zone/list.json';
	var param = {
			moduleId: moduleId
	};
 	ajaxRequest(url, param,function(ret){
		var rows = ret.rows;
		if(rows != undefined ){
			if(rows.length>1){
				showInfo("通用条件的值不唯一，请重新选择");
				return;
			}
			var data = rows[0];
			$('#zoneName').val(data.zoneNo + '→' + data.zoneName);
			$('#zoneNo').val(data.zoneNo);
		}		
	});
}

var JsonSysNo;

function getJsonSysNo()
{
	 url=BasePath+'/initCache/getLookupDtlsList.htm?lookupcode=SYS_NO',
	 ajaxRequestWithAsync(url,{},false,function(data){
			JsonSysNo=eval(data);
		});
};

function ajaxRequest(url,reqParam,callback){
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: true,
		  success: callback
	});
};

//重载ajaxRequest 加入同步异步参数
function ajaxRequestWithAsync(url,reqParam,async,callback){
	$.ajax({
		  async:async,
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: async,
		  success: callback
	});
};

//格式化品牌库信息
function sysNoformatter(value, rowData, rowIndex)
{
	 for (var i = 0; i < JsonSysNo.length; i++) {
        if (JsonSysNo[i].itemval == value) {
            return JsonSysNo[i].itemname;
        }
    }
};

//获取当前时间
function getCurrentDate() {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	var date = year + "-" + month + "-" + day;
	return date;
}

var DateUtils = {
	/** 
	 * 时间对象的格式化 
	 * 
	 * date: 日期，必须为Date类型
	 * format：格式化字符串，支持y年，M月，d日，H时，m分，s秒，S毫秒，q季度
	 */ 
	formatDate : function(date, format) {
		var result = format;
		var options = {
			"y+" : date.getFullYear(),
			"M+" : date.getMonth() + 1, // month  
			"d+" : date.getDate(), // day  
			"H+" : date.getHours(), // hour  
			"m+" : date.getMinutes(), // minute  
			"s+" : date.getSeconds(), // second  
			"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter  
			"S+" : date.getMilliseconds() // millisecond  
		};
	  
		for (var k in options) {  
			if (new RegExp("(" + k + ")").test(result)) {
				var $1 = RegExp.$1;
				var value = options[k];
				
				result = result.replace($1, $1.length == 1 ? value : 
					("00" + value).substr(("" + value).length + 2 - $1.length));  
			}
		}
		
		return result;
	},

	/**
	 * 字符串解析为日期类型，字符串的格式必须是：yyyy-MM-dd HH:mm:ss
	 */
	parseDate : function(dateStr){
		return new Date(Date.parse(dateStr.replace(/-/g, "/")));
	},
	
	// 获取当前日期2014-5-14
	getCurrentDate:function() {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		var date = year + "-" + month + "-" + day;
		return date;
	},
	
	// 获取当前日期2014-5-14 00:00:00
	getCurrentDateTime:function() {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		var date = year + "-" + month + "-" + day+" 00:00:00";
		return date;
	},
	
	// 获取当前日期 20140514
	getCurrentDateStr:function() {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		var date = year + month + day;
		return date;
	},
	
	// 获取当前日期 20140514
	getCurrentDateStrWithAMandPM:function() {
		var today = new Date();
		var day = today.getDate();
		var month = today.getMonth() + 1;
		var year = today.getFullYear();
		month = month < 10 ? "0" + month : month;
		day = day < 10 ? "0" + day : day;
		var AMandPM="PM";
		if(today.getHours()<12){
			AMandPM="AM";
		}
		var date = year + month + day + AMandPM;
		return date;
	},
	// 日期格式化 ftl datagrid 可以使用yyyy-MM-dd HH:mm:ss
	dateFormatter:function(value, rowData, rowIndex) {
		return DateUtils.formatDate(new Date(value), "yyyy-MM-dd HH:mm:ss");
	},
	// 日期格式化 ftl datagrid 可以使用 yyyy-MM-dd
	dateFormatterWithDate:function(value, rowData, rowIndex) {
		return DateUtils.formatDate(new Date(value), "yyyy-MM-dd");
	}
};


/**
 * 打印 
 * 1:简单表头打印
 *  获取datagrid的columns表头属性，通过queryDataUrl查询待打印数据，合并到一起，直接传给lodop打印
 * 2:动态表头打印
 *  通过queryHeaderUrl获取后台返回的待打印表头，然后把值放到弹出框中隐藏的datagrid中（获取datagrid原生结构，这样自己就不用合并表头）
 *  通过queryDataUrl查询待打印数据，合并表头数据，传给lodop打印
 */
(function($) {
    printDialog = function(opts) {
    	//合并options
        opts = opts || {};
        var winOpts = $.extend({},
        {
           intOrient : 0,//0：打印机缺省设置,1：纵向，2：横向
		   params : {},//其他需要打印的数据
		   barcode:'',//条形码数据
		   type:0,//0：简单打印，1：动态打印
		   needParams:0,//0需要查询参数，1不需要带查询参数
		   title : '标题', //打印标题
		   dataGridId : '', //获取要打印的datagridId
		   viewName : 'simple_print', // 打印模板布局界面
		   queryHeaderUrl : '',//动态打印动态获取表头
		   queryDataUrl : '', //查询被打印数据的url
        },opts);
        
        //初始化参数
		var previewUrl = BasePath + '/print/preview?viewName='+winOpts.viewName;
		var $dg = $('#' + winOpts.dataGridId);
		var params = null;
		if(winOpts.needParams == 0){
			params = $dg.datagrid('options').queryParams;
			params.rows=100;
		}
		var columns = null;
		//简单表头获取datagrid数据，复杂表头获取远程数据
		if(winOpts.type == 0){
			 columns = $dg.datagrid('options').columns;
		}else{
			ajaxRequestAsync(BasePath + winOpts.queryHeaderUrl, params, function(returnData) {
				columns = returnData.columns;
			});
		}
		var columnsLength = columns.length;
		//过滤表头不需要打印的column 静态表头配置了printable=false都将不打印
		var grepColumns = $.grep(columns[columnsLength - 1], function(o, i) {
			if ($(o).attr('printable') == false) {
				return true;
			}
			return false;
		}, true);
		//打开待打印数据页面
		ygDialog({
			isFrame: true,
			cache : false,
			title : winOpts.title,
			modal:true,
			showMask: false,
			fit : true,
			href : previewUrl,
			buttons:[{
				text:'打印',
				iconCls:'icon-print',
				handler:'print_page'
			}],
			onLoad:function(win,dialog){
				var tableHeader = dialog.$('#tableHeader');
				var tableBody = dialog.$('#tableBody');
				if(columnsLength > 1){
					dialog.$("#hiddenDiv").remove();
					dialog.$("<div id='hiddenDiv' style='display:none'><table id='exportExcelDG'></table><div>").appendTo("body");
					dialog.$("#exportExcelDG").datagrid({columns : columns});
					var tbody = dialog.$("#exportExcelDG").prev(0).find('.datagrid-htable').find('tbody');
					tableHeader.append(tbody.html());
				}else{
					$(grepColumns).each(function(i,node){
						var title=$(node).attr('title');
						tableHeader.append('<td><div align="center"><b>'+title+'</b></div></td>');
					});
				}
				ajaxRequestAsync(BasePath + winOpts.queryDataUrl, params, function(result) {
					var rows = result.rows;
					dialog.params = result.printVo || {};
					dialog.params.title = winOpts.title;
					dialog.params.intOrient = winOpts.intOrient;
					if('' != winOpts.barcode){
						dialog.params.barcode = winOpts.barcode;
					}
					//利用easyui渲染方便，但数据量大时，速度慢 ，自己拼接速度会快些
					//dialog.$("#exportExcelDG").datagrid({data:rows});
					//var bobyTr = dialog.$("#exportExcelDG").prev(0).find('.datagrid-btable').find('tbody');
					//tableBody.append(bobyTr.html());
					for ( var i = 0; i < rows.length; i++) {
						var row = rows[i];
						//拼接表体信息
						var bodyTrNode ='<tr>';
						var bodyTdNode = '';
						$(grepColumns).each(function(i,node){
							var field=$(node).attr('field');
							var value = row[field+''];
							if (typeof(value) == 'undefined' || null == value) {
								value = '';
							}	
							bodyTdNode+='<td>'+value+'</td>';
						});
						bodyTrNode+=bodyTdNode+'</tr>';
						//填充表体
						tableBody.append(bodyTrNode);
					}
				});
			}
		});
    };
})(jQuery);



/**
 * 打印 
 * 1:简单表头打印
 *  获取datagrid的columns表头属性，通过queryDataUrl查询待打印数据，合并到一起，直接传给lodop打印
 * 2:动态表头打印
 *  通过queryHeaderUrl获取后台返回的待打印表头，然后把值放到弹出框中隐藏的datagrid中（获取datagrid原生结构，这样自己就不用合并表头）
 *  通过queryDataUrl查询待打印数据，合并表头数据，传给lodop打印
 */
(function($) {
    printDialogTemp = function(opts) {
    	//合并options
        opts = opts || {};
        var winOpts = $.extend({},
        {
           intOrient : 0,//0：打印机缺省设置,1：纵向，2：横向
		   params : {},//其他需要打印的数据
		   barcode:'',
		   type:0,//0：简单打印，1：动态打印
		   needParams:0,//0需要查询参数，1不需要带查询参数
		   title : '标题', //打印标题
		   dataGridId : '', //获取要打印的datagridId
		   viewName : 'simple_print', // 打印布局界面
		   queryHeaderUrl : '',//动态打印动态获取表头
		   queryDataUrl : '' //查询被打印数据的url
        },opts);
        
        //初始化参数
		var previewUrl = BasePath + '/print/preview?viewName='+winOpts.viewName;
		var $dg = $('#' + winOpts.dataGridId);
		var params = null;
		if(winOpts.needParams == 0){
			params = $dg.datagrid('options').queryParams;
			params.rows=100;
		}
		
		//获取List 分组打印
		var headerDatas="";//头部数组
		ajaxRequestAsync(BasePath + winOpts.queryHeaderUrl, params, function(returnData) {
			headerDatas=returnData;
		});
		var bodyDatas="";//打印数据数组
		ajaxRequestAsync(BasePath + winOpts.queryDataUrl, params, function(result) {
			bodyDatas=result;
		});
		
		//打开待打印数据页面
		ygDialog({
			isFrame: true,
			cache : false,
			title : winOpts.title,
			modal:true,
			showMask: false,
			fit : true,
			href : previewUrl,
			buttons:[{
				text:'打印',
				iconCls:'icon-print',
				handler:'print_page'
			}],
			onLoad:function(win,dialog){
				var contentDiv=dialog.$("#contentDiv");
				//循环表头
				$.each(headerDatas,function(n,value){
					//先获取对应表头的打印数据
					var result="";
					$.each(bodyDatas,function(i,data){
						if((data.rows[0].storeName+data.rows[0].companyName)==(value.printVo.storeName+value.printVo.companyName)){
							result=data;
						}
					});
					var tableHeader = dialog.$('#printContentDiv #printTable #tableHeader');
					var tableBody = dialog.$('#printContentDiv #printTable #tableBody');
					//清空模版
					tableHeader.html("");
					tableBody.html("");
					//表头
					var columns = value.columns;
					var columnsLength = columns.length;
					//过滤表头不需要打印的column 静态表头配置了printable=false都将不打印
					var grepColumns = $.grep(columns[columnsLength - 1], function(o, i) {
						if ($(o).attr('printable') == false) {
							return true;
						}
						return false;
					}, true);
					if(columnsLength > 1){
						dialog.$("#hiddenDiv").remove();
						dialog.$("<div id='hiddenDiv' style='display:none'><table id='exportExcelDG'></table><div>").appendTo("body");
						dialog.$("#exportExcelDG").datagrid({columns : columns});
						var tbody = dialog.$("#exportExcelDG").prev(0).find('.datagrid-htable').find('tbody');
						tableHeader.append(tbody.html());
					}else{
						$(grepColumns).each(function(i,node){
							var title=$(node).attr('title');
							tableHeader.append('<td><div align="center"><b>'+title+'</b></div></td>');
						});
					}
					//循环显示打印数据列表
					var rows = result.rows;
					dialog.params = result.printVo || {};
					dialog.params.title = winOpts.title;
					dialog.params.intOrient = winOpts.intOrient;
					if('' != winOpts.barcode){
						dialog.params.barcode = winOpts.barcode;
					}
					dialog.onload(dialog.params);//填充表头数据
					//利用easyui渲染方便，但数据量大时，速度慢 ，自己拼接速度会快些
					for ( var i = 0; i < rows.length; i++) {
						var row = rows[i];
						//拼接表体信息
						var bodyTrNode ='<tr>';
						var bodyTdNode = '';
						$(grepColumns).each(function(i,node){
							var field=$(node).attr('field');
							var value = row[field+''];
							if (typeof(value) == 'undefined' || null == value) {
								value = '';
							}	
							bodyTdNode+='<td>'+value+'</td>';
						});
						bodyTrNode+=bodyTdNode+'</tr>';
						//填充表体
						tableBody.append(bodyTrNode);
					}
					contentDiv.append(dialog.$("#printHeaderDiv").html());
					contentDiv.append(dialog.$("#printContentDiv").html());
					contentDiv.append("<div style='page-break-after:always'>&nbsp;</div>");
				});
			}
		});
    };
})(jQuery);