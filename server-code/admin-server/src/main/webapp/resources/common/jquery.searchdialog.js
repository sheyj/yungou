/*
 * jQuery searchDialog plugin
 * @version: 1.10 (2013-10-28)
 * @requires jQuery v1.6.4 or later and easyui
 * @author dong.j(dong.j@yougou.com)
 * @update 2013-11-5 support jquery public method
 *
 * rules : 1,query button id must be id='btn_dialog_search'
 *         2,clear button is must be id='btn_dialog_clear'
 * Examples :
 *  <input type="button" value="..." id="itemQueryBtn" style="width:30px"/>
 *  $("#itemQueryBtn").searchDialog({
 *		href : BasePath + '/bill_delivery_nt/list_tabMain.htm',
 *		width : 600,
 *		height : 400,
 *		onLoad : function() {
 *			console.log("加载页面成功");
 *		},
 *		onCall : function(rowIndex, rowData) {
 *			console.log("点击了"+rowIndex+"行，数据为"+rowData);
 *		}
 *	});
 *
 * $.searchDialog({
 *		href : BasePath + '/bill_delivery_nt/list_tabMain.htm',
 *		width : 600,
 *		height : 400,
 *		onLoad : function() {
 *			console.log("加载页面成功");
 *		},
 *		onCall : function(rowIndex, rowData) {
 *			console.log("点击了"+rowIndex+"行，数据为"+rowData);
 *		}
 *	});
 */
(function($) {
	$.fn.searchDialog = function(options) {
		searchDialog.init();
		var opts = $.extend({}, $.fn.searchDialog.defaults, options);
		$(this).live('click', function() {
			searchDialog.open(opts);
		});
	};

	$.fn.searchDialog.defaults = {
		title : '查询助手',// 弹窗标题
		href : '',// 弹窗目标地址
		width : 600,// 弹窗宽度
		height : 400,// 弹窗高度
		targetForm : 'dialog_SarchForm',
		targetGrid : 'dialog_SearchDataGrid',// 弹窗中展现数据的datagrid id
		queryUrl : '', // 查询url
		onLoad : function() {// 页面加载完成后执行
		},
		onCall : function(rowIndex, rowData) {// 选择对应数据后执行
		}
	};

	var searchDialog = {
		init : function() {
			if ($("#searchDialog_div").length < 1) {
				$(document.body)
						.after(
								'<div id="searchDialog_div" style="clear: both;overflow:hidden;"></div>');
			}
		},
		open : function(o) {
			$('#searchDialog_div')
					.window(
							{
								title : o.title,
								width : o.width,
								height : o.height,
								closed : false,
								cache : false,
								collapsible : false,
								minimizable : false,
								maximizable : false,
								resizable : false,
								shadow : false,
								modal : true,
								href : o.href,
								onLoad : function() {
									o.onLoad.call();
									var $targetDG = $("#" + o.targetGrid);
									$targetDG.datagrid({
										onDblClickRow : function(rowIndex,
												rowData) {
											if(o.onCall(rowIndex, rowData) != false){
												$('#searchDialog_div').window(
														'close');
											}
										}
									});
									$('#btn_dialog_search')
											.bind(
													'click',
													function() {
														var fromObjStr = $('#'+ o.targetForm).form('getData');
														var url = o.queryUrl;
														$targetDG
																.datagrid('options').queryParams = fromObjStr;
														$targetDG
																.datagrid('options').url = url;
														$targetDG
																.datagrid('load');
													});
									$('#btn_dialog_clear').bind(
											'click',
											function() {
												$('#' + o.targetForm).form(
														"clear");
											});
								}
							});
		},
		close : function() {
			$('#searchDialog_div').window('close');
		}
	};

	$.searchDialog = function(options) {
		$.fn.searchDialog.open(options);
	};

	$.fn.searchDialog.open = function(options) {
		searchDialog.init();
		var opts = $.extend({}, $.fn.searchDialog.defaults, options);
		searchDialog.open(opts);
	};

	$.fn.searchDialog.close = function() {
		searchDialog.close();
	};
})(jQuery);