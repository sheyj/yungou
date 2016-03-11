<#-- 
此宏生成的是一个DIV层-实现easyui的 panel
Id: 必填-是该层的ID  
moduleFlag: 必填-需加载查询列的模块列名    
queryGridId: 必填-当公用查询返回记录展示的表格的ID号
queryDataUrl:必填-最终查询业务数据的URl(全称)
title: 选填-面板标题 
width:选填-面板的宽度 
height:选填-面板的高度
//下面这2个只有在做设置界面才有,清空主界面的组件和树不选中
treeId:主界面的树ID
formId:主界面form ID
onLoadSuccess:true|false 默认为true
-->
<#macro queryConditionDiv
	id     queryGridId  queryDataUrl  moduleFlag="" title="条件查询区域"  width="auto" height="150"   collapsed="false" treeId="" formId=""
    onLoadSuccess="true" dbTableName=""
>
<script type="text/javascript">
    var columnRelationURL="<@s.url '/initCache/getTableColumnList.htm?operatorFlag=1' />";
	var columnNameURL="<@s.url '/initCache/getTableColumnList.htm?operatorFlag=2&moduleFlag=' />"+"${moduleFlag}";
	var columnConditionURL="<@s.url '/initCache/getTableColumnList.htm?operatorFlag=3' />";
	var columnNameJSON;
	$(document).ready(function(){
	    
          var $id = $("#${id!}"); 
          $id.panel({    
			  height:${height},
			  <#if width=='auto'>
			     width:$id.parent().width(),
			     <#else>
			     width:${width}
			  </#if>
			  <#if collapsed=='false'>
			     expand:true 
			    <#else>
			    collapsed:true
			  </#if>
	      });
	      

	      
	     ajaxRequest(columnNameURL,{},function(result){
			 columnNameJSON=result;
		});
	});
	
	// 字段格式  
    function columnNameFormatter(value, rowData, rowIndex) {  
		    if (value==0) {  
		        return "";  
		    }  
		    for (var i = 0; i < columnNameJSON.length; i++) {  
		        if (columnNameJSON[i].valueField == value) {  
		            return columnNameJSON[i].textField;  
		        }  
		    }  
		    return value;  
    } 
   // 结束编辑 
   function endEdit(dataGridId){
            var $dg = $("#"+dataGridId+"");
            var rows = $dg.datagrid('getRows');
            for ( var i = 0; i < rows.length; i++) {
               $dg.datagrid('endEdit', i);
            }
   }
   
  // 更新后台表的最新字段,为了就是防止字段有修改 
  function reloadTableColumnList(){
             var reloadTableColumnListURL="<@s.url "/initCache/reloadTableColumnList.htm"/>";
             ajaxRequest(reloadTableColumnListURL,{},function(result){
          
		    });
  }
    
 //有关动态查询条件
 function queryCondition(){
        endEdit("queryConditionDiv_dataGrid");
	    var $dg = $("#queryConditionDiv_dataGrid"); //查询条件表格ID
	    var $form=$("#queryConditionDivFrom_"); //验证查询条件的合法性的Form-必填项
	    
	    var flag= $form.form('validate');
        if(flag==false){
          return ;
        }
        
        var array= [];
        var rows = $dg.datagrid('getRows');
        for ( var i = 0; i < rows.length; i++) {
           array.push(rows[i]);
        }
        
        
        var getSqlURl="<@s.url '/initCache/getDoWithValidSql.htm' />";
       	var queryParams="";
       	var errorMsg="";
	 	$.ajax({
			  type: 'POST',
			  url: getSqlURl,
			  data: {queryCondition:JSON.stringify(array)},
			  cache: true,
			  async:false, 
			  success: function(returnData,msg){
			     errorMsg=returnData.errorMsg;
                 queryParams=returnData.queryConditionSQL;	      	
			  }
	     });
	     
	    
	   if(errorMsg!=null&&errorMsg!=""){  
		    alert(errorMsg);
	        $("#${queryGridId}").datagrid('options').queryParams={ queryCondition:" and 1=2 " };; 
		       $("#${queryGridId}").datagrid('options').url="${queryDataUrl}";
		       $("#${queryGridId}").datagrid('load');
		       $("#${queryGridId}").datagrid({
			        onLoadSuccess:function(data){
			            	 
			       }
		        });
		       $("#${queryGridId}").datagrid('options').queryParams="";
		    return ;
	   }else{
	              //最终显示结果
		       $("#${queryGridId}").datagrid('options').queryParams={ queryCondition:queryParams  };; 
		       $("#${queryGridId}").datagrid('options').url="${queryDataUrl}";
		       $("#${queryGridId}").datagrid('load');
		        if(${onLoadSuccess}){
		        	$("#${queryGridId}").datagrid({
					      onLoadSuccess:function(data){
					            	 
					       }
				     });
		        }
		      
	   }
	  

	  
	     

 }
     
    // 添加
     function addDataGridCommon(dataGridId){
    	 var $dg = $("#"+dataGridId+"");
    	 $dg.datagrid('appendRow', {"columnRelation":"并且"});
          var rows = $dg.datagrid('getRows');
          $dg.datagrid('beginEdit', rows.length - 1);
          $dg.datagrid('selectRow', rows.length - 1);
          
     }   
</script>
<form id="queryConditionDivFrom_">
<div width='100%' id="${id}" class="easyui-panel" title="${title}" style="padding:0px;background:#F4F4F4" 
     iconCls="icon-mini-tis" data-options="collapsible:true,tools:'#queryConditionDivTools'" >
     <@p.datagrid id="queryConditionDiv_dataGrid"  loadUrl="" saveUrl=""  defaultColumn=""  
       isHasToolBar="false"   height="${height}"    pagination="false" fit="true"
       columnsJsonList='[
          {field : "columnRelation",title : "条件关系",width : 100,editor:{type:"combobox", options:{required:true,missingMessage:"必填项不能为空!",panelHeight:"auto",url:columnRelationURL,valueField:"valueField",textField:"textField"} }  } ,
          {field : "columnName",title : "字段名称",formatter:columnNameFormatter,width : 150,editor:{type:"combobox", options:{required:true,missingMessage:"必填项不能为空!",panelHeight:"auto",url:columnNameURL,valueField:"valueField",textField:"textField"} }  } ,
          {field : "columnCondition",title : "条件",width : 100,editor:{type:"combobox", options:{required:true,missingMessage:"必填项不能为空!",panelHeight:"auto",url:columnConditionURL,valueField:"valueField",textField:"textField"} }  } ,
          {field : "columnValue",title : "数值",width : 120,editor:{type:"validatebox", options:{required:true,missingMessage:"必填项不能为空!" } }  }
         ]' 
          
       jsonExtend='{onDblClickRow:function(rowIndex, rowData){
               
       }}'/>
</div> 
</form> 
<#-- 工具条结束   增加与删除操作时调用 easyui_dataGrid.js 的方法 -->	
<div id="queryConditionDivTools">
    <a href="javascript:queryCondition()" title="查询操作" class="icon-search" ></a>
	<a href="javascript:addDataGridCommon('queryConditionDiv_dataGrid')" title="增加条件" class="icon-add" ></a>
	<a href="javascript:void(0)" title="删除条件" class="icon-remove" onclick="javascript:removeDataGridCommon('queryConditionDiv_dataGrid')"></a>
<#-- <a href="javascript:void(0)" title="刷新字段" class="icon-reload" onclick="javascript:reloadTableColumnList()"></a> --> 
</div>   
</#macro>
