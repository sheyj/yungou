//ie console.time()
if (window.console && typeof(window.console.time) == "undefined") {
    console.time = function(name, reset) {
        if (!name) {
            return;
        }
        var time = new Date().getTime();
        if (!console.timeCounters) {
            console.timeCounters = {}
        };
        var key = "KEY" + name.toString();
        if (!reset && console.timeCounters[key]) {
            return;
        }
        console.timeCounters[key] = time;
    };

    console.timeEnd = function(name) {
        var time = new Date().getTime();
        if (!console.timeCounters) {
            return;
        }
        var key = "KEY" + name.toString();
        var timeCounter = console.timeCounters[key];
        if (timeCounter) {
            var diff = time - timeCounter;
            var label = name + ": " + diff + "ms";
            console.info(label);
            delete console.timeCounters[key];
        }
        return diff;
    };
}

//文本框操作
if (window.jQuery) {
    $('.ipt').on('mouseover',
    function() {
        $(this).addClass('ipt-focus');
    });
    $('.ipt').on('mouseout',
    function() {
        $(this).removeClass('ipt-focus');
    });
}

//成功操作提示
function showSuc(msg) {
    top.$.messager.show({
        title: '提示',
        msg: msg,
        timeout: 1000,
				position:'bottomRight',
        showType: 'slide'
    });
}

//提示
function showInfo(msg) {
    top.$.messager.alert('提示', msg, 'info');
}

//警告操作提示
function showWarn(msg) {
    top.$.messager.alert('提示', msg, 'warning');
}

//错误操作提示
function showError(msg) {
    top.$.messager.alert('提示', msg, 'error');
}

function showProcess(show,msg){
	if(!show){
		top.$.messager.progress('close');
		return;
	}
	top.$.messager.progress({
		msg:msg,
		text:''
	});
}

function showConfirm(msg,fn){
	top.$.messager.confirm(msg,function(r){
		if(r){
			if(typeof fn=="function"){
				fn();
			}
		}
	});
}

//显示高级搜索
function popSearch(obj,target) {
    if ($(obj).hasClass("search-down-arr")) {
        $(target).layout('show', 'north');
        $(obj).attr("class", "search-up-arr");
    } else {
        $(target).layout('hidden', 'north');
        $(obj).attr("class", "search-down-arr");
    }
}


function toolSearch(opts){
	var _box=$('<div>').attr('id',"searchDiv").addClass('simple-search-box');
	var _a=$('<a>').attr({'id':"searchArr",'href':'javascript:;'}).addClass('search-up-arr');
	var _tbM=$('<div>').addClass('toolbar_menu');
	var opts=opts || {collapsible:true,items:[]};
	var target=opts.target || $('#subLayout');
	var appendTo=opts.appendTo || $('#toolbar');
	var items=opts.items;
	var _width=opts.width || 250;
	var _pos=opts.pos || 'right';
	appendTo.css({'position':'relative'});
	if(items&&items.length>0){
		for(var i=0;i<items.length;i++){
			var _d=$('<div>');
			_d.attr('name',items[i].name).html(items[i].text);
			_tbM.append(_d);
		}
		 _box.append('<input class="tbSearch"/>');
	}

	 if(opts.collapsible!=false){
		 _a.click(function(){
				popSearch(this,target);
			});
	 		_box.append(_a);
	 }else{
		 _box.css({right:5});
		 if(_pos=="left"){
		  	_box.css({left:5});
	 		}
	 }
	 
	 
	 
	 _box.append(_tbM);
	 if(appendTo){
		 $(appendTo).append(_box);
	 }
	 
	 
	if(items&&items.length>0){
		$('.tbSearch',appendTo).searchbox({
				width:_width,
				searcher:function(value,name){
					if(typeof opts.callback=="function"){
						opts.callback(value,name);
					}
				},
				menu:$('.toolbar_menu',appendTo),
				prompt:'请输入关键字' 
		});	
	}
	if($('.search-div').closest('.layout-panel-north').css('display')=="none"){	
		setTimeout(function() {
			$('#searchArr',appendTo).addClass('search-down-arr').removeClass('search-up-arr');
		},200);
	}
	 
}

//创建多个tab
(function($){
	$.fn.createTabs=function(options){
		var options=$.extend({
			 selected:0
			}, options || {});
			
			
		var that=this;
		var items=options.tabs;
		this.addClass('easyui-tabs').attr('data-options','plain:true,fit:true');
		for(var i=0;i<items.length;i++){
			var title=items[i].title;
			var href=items[i].href;
			var lazyload=false;
			if(items[i].lazyload){
				lazyload=items[i].lazyload;
			}
			var div=$('<div data-options="title:\''+title+'\',refreshButton:true,lazyload:'+lazyload+'" style="overflow:hidden;"></div>');
			if(lazyload){
				div.html('<iframe scrolling="auto" frameborder="0"  class="tabs-iframe" lazysrc="'+href+'"></iframe>');
			}else{
				div.html('<iframe scrolling="auto" frameborder="0"  class="tabs-iframe" src="'+href+'"></iframe>');
			}
			div.appendTo(that);
		}
	
	var index=0;
	$(that).tabs({
		onSelect:function(title,idx){
					var pp=$(that).tabs('getSelected');
					var opts=pp.panel('options');
					if(opts.lazyload){
						var iframe=pp.find('iframe');
						if(!iframe[0]){
							return;
						}
						if(iframe.attr('lazysrc')!="" && (index!=0||options.selected==0)){
							iframe.attr('src',iframe.attr('lazysrc')).removeAttr('lazysrc');
						}
				}
				index=idx;
		}
		});
		
		$(that).tabs('select',options.selected);

		

		return that;
	}
})(jQuery);

function addBlankTab(opts){
	addNewTab(opts,true);
}

function addTab(opts){
	addNewTab(opts,false);
}


function addNewTab(opts,blank) {
	var title = opts.title;
	var href = opts.href;
	var icon = opts.icon;
	var iframed = opts.iframed || true;
	var refreshed = opts.refreshed || false;
	var closabled = opts.closabled;
	if (typeof(iframed) == "undefined") {
			iframed = true;
	}
	var tt = $('#mainTabs');	
	if(tt.tabs('exists',title)){
		tt.tabs('select',title);
		if(refreshed){
					refreshTab(title);
		}
		return;
	}else{
			tt.tabs('add',{
				title: title,
				href: href,
				iniframe: iframed,
				showMask:true,
				closable: true
			});
	}
	
}



var onlyOpenTitle = "系统桌面";
function resetDetailViewHeight(_h) {
    if (parent.$('#ddv-' + parent.editRowIndex)[0]) {
        parent.$('#ddv-' + parent.editRowIndex).height(_h);
        parent.tbgrid.datagrid('fixDetailRowHeight', parent.editRowIndex);
    }
}

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
							
							searchBtn.click(function(){
											var targetForm=$('#dialog_SarchForm');
											tb.datagrid('options').queryParams = targetForm.form('getData');
											tb.datagrid('options').url = opts.queryUrl;
											tb.datagrid('load');
							});
							
							clearBtn.click(function(){
									$('#dialog_SarchForm').form('clear');
								});
								
							if(confirmBtn){
								confirmBtn.click(function(){
									var rowsData=tb.datagrid('getSelections');
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
						
						tb.datagrid({
							onDblClickRow:function(rowIndex, rowData){
								if(typeof top.dgSelectorOpts.fn=="function"){
									top.dgSelectorOpts.fn(rowData,rowIndex);
									if($(top.iptSearchInputObj)[0]&&$(top.iptSearchInputObj).hasClass('easyui-validatebox')){
										$(top.iptSearchInputObj).validatebox('validate');
									}
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




// 添加
function addDataGridCommon(dataGridId){
	 var $dg = $("#"+dataGridId+"");
	 $dg.datagrid('appendRow', {});
     var rows = $dg.datagrid('getRows');
     $dg.datagrid('beginEdit', rows.length - 1);
     $dg.datagrid('selectRow', rows.length - 1);
     
}

// 删除
function removeDataGridCommon(dataGridId){
	   var $dg = $("#"+dataGridId+"");
      var row = $dg.datagrid('getSelected');
       if (row) {
              var rowIndex = $dg.datagrid('getRowIndex', row);
              $dg.datagrid('deleteRow', rowIndex);
              if((rowIndex-1)>=0){
           	   $dg.datagrid('selectRow', rowIndex-1);
              }
      }
}

// 删除所有行
function deleteAllGridCommon(dataGridId){
	   /*var $dg = $("#"+dataGridId+"");
 	   var rows = $dg.datagrid('getRows');
 	   if(rows){
 	  	  for ( var i = 0; i < rows.length; i++) {
 	  		var rowIndex = $dg.datagrid('getRowIndex', rows[i]);
           $dg.datagrid('deleteRow', rowIndex);
	  	  }
 	   }*/
		$('#'+datagridId).datagrid('loadData', { total: 0, rows: [] });
}

   
	//获得当前行号   一般用 var rowIndex=getRowIndex(this);
	function getRowIndex(target) {
   var tr = $(target).closest('tr.datagrid-row');
   return parseInt(tr.attr('datagrid-row-index'));
 }  


// 结束编辑 
function endEditCommon(dataGridId){
	    var $dg = $("#"+dataGridId+"");
       var rows = $dg.datagrid('getRows');
       for ( var i = 0; i < rows.length; i++) {
       	$dg.datagrid('endEdit', i);
       }
}

// 获取该表格有变动的记录 inserted\deleted\updated
function getChangeTableDataCommon(dataGridId){
	 var $dg = $("#"+dataGridId+"");
	 endEditCommon(dataGridId);
	 var effectRow = new Object();
	 if($dg.datagrid('getChanges').length) {
		  var inserted = $dg.datagrid('getChanges', "inserted");
         var deleted = $dg.datagrid('getChanges', "deleted");
         var updated = $dg.datagrid('getChanges', "updated");
         
         
         if (inserted.length) {
             effectRow["inserted"] = JSON.stringify(inserted);
         }
         
         if (deleted.length) {
             effectRow["deleted"] = JSON.stringify(deleted);
         }
         
         if (updated.length) {
             effectRow["updated"] = JSON.stringify(updated);
         }
	 }
	
	 return effectRow;
}

// 全选或者全不选   checkstatus 1--全选   0--全不选
function selectCheckAllRowCommon(dataGridId,checkstatus){
     var rows = $('#'+dataGridId).datagrid('getRows');
     for ( var i = 0; i < rows.length; i++) {
         if(checkstatus==0){
            $('#'+dataGridId).datagrid('uncheckRow', i);
         }else{
            $('#'+dataGridId).datagrid('checkRow', i);
         } 
     }
}

   
// 返回前一个页面
function returnTab(tabID,title){
   $('#'+tabID).tabs('select',title);
}



//发达ajax请求
function ajaxRequest(url,reqParam,callback){
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: true,
		  success: callback
	});
}

//发达ajax请求
function ajaxRequestAsync(url,reqParam,callback){
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: true,
		  async: false,
		  success: callback
	});
}

//截取时间格式yyyy-MM-dd
function formatDate(value) {
 if (value == null || value == '') {
     return '';
 }
 if(value.length > 10){
	  return value.substring(0,10);
 }
 return value;  
}  

//有关日期的控件处理
function formatDatebox(value) {
   if (value == null || value == '') {
       return '';
   }
   var dt;
   if (value instanceof Date) {
       dt = value;
   } else {
       dt = new Date(value);
       if (isNaN(dt)) {
           value = value.replace(/\/Date\((-?\d+)\)\//, '$1'); 
           dt = new Date();
           dt.setTime(value);
       }
   }
  return dt.format("yyyy-MM-dd");  
}  

$.extend(
	    $.fn.datagrid.defaults.editors, {
	        datebox: {
	            init: function (container, options) {
	                var input = $('<input type="text">').appendTo(container);
	                input.datebox(options);
	                return input;
	            },
	            destroy: function (target) {
	                $(target).datebox('destroy');
	            },
	            getValue: function (target) {
	                return $(target).datebox('getValue');
	            },
	            setValue: function (target, value) {
	                $(target).datebox('setValue', formatDatebox(value));
	            },
	            resize: function (target, width) {
	                $(target).datebox('resize', width);
	            }
	        }
	    });
	Date.prototype.format = function (format) 
	{
	    var o = {
	        "M+": this.getMonth() + 1, //month 
	        "d+": this.getDate(),    //day 
	        "h+": this.getHours(),   //hour 
	        "m+": this.getMinutes(), //minute 
	        "s+": this.getSeconds(), //second 
	        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter 
	        "S": this.getMilliseconds() //millisecond 
	    }
	    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
	    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o) if (new RegExp("(" + k + ")").test(format))
	        format = format.replace(RegExp.$1,
	      RegExp.$1.length == 1 ? o[k] :
	        ("00" + o[k]).substr(("" + o[k]).length));
	    return format;
	}


    
// 公用弹出框
function alert(msg,type){
  //info-0,warning-1,error-2,question-3 ,success-4 
   var typeStr="info";
   if(type==1){
       typeStr='warning';
   }else if(type==2){
       typeStr='error';
   }else if(type==3){
       typeStr='question';
   }else if(type==4){
       typeStr='success';
   }else{
       typeStr='info';
   }
   $.messager.alert('提示',msg,typeStr); 
}
    
// js debug
function debug(msg){
	     console.debug(msg);  
}

//发达ajax请求
function ajaxRequest(url,reqParam,callback){
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: true,
		  success: callback
    });
}
    
function checkPowerJS(powerValue,index){
    var flag=false;
    var  temp =parseInt(Math.pow(2,index));
      var result = powerValue&temp;
        if(result== temp){
             flag=true;
        }
    return flag;
}




$(function(){
	
	//清空查询表单
	$('#clearBtn').live('click',function(){
		var myForm=$(this).closest('form');
		myForm.form('clear');
	});
	
	if(typeof parsePage=="function"){
			parsePage();
	}
	
	
});
