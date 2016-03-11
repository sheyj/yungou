<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>系统参数维护</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script type="text/javascript" src="<@s.url "/resources/js/system_param/system_param.js?version=${version}"/>"></script>
</head>
<body class="easyui-layout">
     <#-- 工具菜单div -->
	 <div data-options="region:'north',border:false" class="toolbar-region">
	  		<@p.toolbar id="toolbar"  listData=[
		    	{"title":"查询","iconCls":"icon-search","action":"systemParam.searchInfo()", "type":0},
		        {"title":"清除","iconCls":"icon-remove","action":"systemParam.searchClear()", "type":0},
				{"title":"新增","iconCls":"icon-add","action":"systemParam.addInfo()","type":1},
				{"title":"修改","iconCls":"icon-edit","action":"systemParam.editInfo()","type":2},
              {"title":"删除","iconCls":"icon-del","action":"systemParam.delInfo()","type":3},
                {"title":"导出","iconCls":"icon-export","action":"systemParam.exportExcel()","type":4}
		     ]/>
	 </div>
	 <div data-options="region:'center',border:false">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north',border:false">
			    <div class="search-div">
				  <form name="searchForm" id="searchForm" method="post">
					<table class="form-tb" >
					<col width="80" />
                    <col/>
                    <col width="80" />
                    <col/>
                    <col width="80" />
                    <col/>
                    <col width="80" />
                    <col/>
	                 <tbody>
						<tr>
						    <th>参数名称：</th>
		        		    <td><input class="easyui-validatebox ipt" name="paramName" id="paramNameCondition" />
		        		    </td>
		        		    <th>参数类型：</th>
		        		    <td><input class="easyui-validatecombox ipt" name="paramType" id="paramTypeCondition" /></td>
		        		    <th>状态：</th>
		        		    <td><input class="easyui-validatecombox ipt" name="status" id="statusCondition" /></td>
					      </tr>
					   </tbody>
					</table>
				  </form>
			  </div>
			</div>
			<#-- 数据列表div -->
		    <div data-options="region:'center',border:false">
	          	 <@p.datagrid id="dataGridJG"  loadUrl="" saveUrl=""  defaultColumn="" title="系统参数列表"
			      		isHasToolBar="false" divToolbar="#searchDiv"  onClickRowEdit="false"  pagination="true"
				        rownumbers="true"  emptyMsg="" singleSelect="false"
				        columnsJsonList="[
				                  {field : 'ck',checkbox:true,notexport:true},
				                  {field : 'paramName',title : '参数名称',width : 100,align:'left'},
				                  {field : 'paramValue',title : '参数值',width : 120,align:'left'},
				                  {field : 'paramType',title : '参数类型',width : 120,align:'left'},
				                  {field : 'status',title : '状态',width : 120,align:'left'},
				                  {field : 'id',title : '',hidden:'true'},
				                  {field : 'remark',title : '备注',width : 150,align:'left'}
				                 ]"   
				                 jsonExtend='{onDblClickRow:function(rowIndex, rowData){
	                                   //双击方法
			                            systemParam.loadDetail(rowData);
			          }}'
				/>
		   </div>
	   </div>
    </div> 
			
		 <div id="myFormPanel" class="easyui-dialog" data-options="closed:true">
			  <form name="dataForm" id="dataForm" method="post" class="pd10">
				<table class="form-tb">
		        	<col width="100"/>
		        	<col/>
		        	<col width="100"/>
		        	<col/>
		        	<tbody>
			            <tr>
							<th><em class="cred">*</em>参数名称：</th>
							<td><input class="easyui-validatebox ipt"  name="paramName" id="paramName" data-options="required:true,validType:'rangeLength[1,50]'"/>
							<input type="hidden" name="id" id="idCondition" />
							</td>
							<th><em class="cred">*</em>参数值：</th>
							<td><input class="easyui-validatebox ipt"  name="paramValue" id="paramValue" data-options="required:true,validType:'rangeLength[1,50]'"/></td>
						</tr>
						 <tr>
						 	<th>参数类型：</th>
							<td><input class="easyui-validatecombox ipt"  name="paramType" id="paramTypeAdd"  data-options="required:true"/></td>
							<th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusAdd"   data-options="required:true"/></td>
						 </tr>
						<tr>
							<th>备注：</th>
							<td><input class="easyui-validatebox ipt" name="remark" id="remark" maxlength="100" ></input></td>
						</tr>
			         </tbody>
               </table>
	       </form>
       </div>
       
</body>
</html>