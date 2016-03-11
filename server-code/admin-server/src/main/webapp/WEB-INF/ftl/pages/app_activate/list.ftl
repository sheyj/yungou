<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>用户激活查询</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script type="text/javascript" src="<@s.url "/resources/js/app_activate/app_activate.js?version=${version}"/>"></script>
</head>
<body class="easyui-layout">
     <#-- 工具菜单div -->
	 <div data-options="region:'north',border:false" class="toolbar-region">
	  		<@p.toolbar id="toolbar"  listData=[
		    	{"title":"查询","iconCls":"icon-search","action":"appActivate.searchInfo()", "type":0},
		        {"title":"清除","iconCls":"icon-remove","action":"appActivate.searchClear()", "type":0},
				<#--{"title":"修改","iconCls":"icon-edit","action":"appActivate.editInfo()","type":2},-->
                {"title":"导出","iconCls":"icon-export","action":"appActivate.exportExcel()","type":4}
		     ]/>
	 </div>
	 <div data-options="region:'center',border:false">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north',border:false">
			    <div class="search-div">
				  <form name="searchForm" id="searchForm" method="post">
					<table class="form-tb" >
					<col width="120" />
                    <col/>
                    <col width="120" />
                    <col/>
                    <col width="120" />
                    <col/>
	                 <tbody>
						<tr>
						    <th>手机型号：</th>
		        		    <td><input class="easyui-validatebox ipt" name="mobileTypeLike" id="mobileTypeCondition" />
		        		    </td>
		        		    <th>用户来源：</th>
		        		    <td><input class="easyui-validatebox ipt" name="fromNameLike" id="fromNameCondition" /></td>
		        		    
		        		    <th>用户来源编号：</th>
							<td><input class="easyui-validatebox ipt"  name="fromNoLike" id="fromNoCondition"  /></td>
		        		    
					      </tr>
					      <tr>
					      	<th>激活时间：</th>
		        		    <td><input class="easyui-datebox ipt" data-options="maxDate:'createTimeEnd'" name="createTimeStart" id="createTimeStart" /></td>
		        		    <th>至&nbsp;</th>
			        		<td><input class="easyui-datebox ipt" data-options="minDate:'createTimeStart'"  name="createTimeEnd" id="createTimeEnd"/>
			        		</td>
					      </tr>
					   </tbody>
					</table>
				  </form>
			  </div>
			</div>
			<#-- 数据列表div -->
		    <div data-options="region:'center',border:false">
	          	 <@p.datagrid id="dataGridJG"  loadUrl="" saveUrl=""  defaultColumn="" title="激活用户列表"
			      		isHasToolBar="false" divToolbar="#searchDiv"  onClickRowEdit="false"  pagination="true"
				        rownumbers="true"  emptyMsg="" singleSelect="false"
				        columnsJsonList="[
				                  {field : 'ck',checkbox:true,notexport:true},
				                  {field : 'mobileType',title : '手机型号',width : 100,align:'left'},
				                  {field : 'fromName',title : '用户来源',width : 120,align:'left'},
				                  {field : 'fromNo',title : '用户来源编码',width : 120,align:'left'},
				                  {field : 'id',title : '',hidden:'true'},
				                  {field : 'createTime', title : '激活时间', width : 150,align:'left'},
				                  {field : 'androidVersion',title : '系统版本',width : 150,align:'left'},
				                  {field : 'deviceId',title : '设备编码',width : 150,align:'left'}
				                  
				                 ]"   
				                 jsonExtend='{onDblClickRow:function(rowIndex, rowData){
	                                   //双击方法
			                            appActivate.loadDetail(rowData);
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
							<th><em class="cred">*</em>用户名称：</th>
							<td><input class="easyui-validatebox ipt"  name="userName" id="userName" data-options="required:true,validType:'rangeLength[1,20]'"/>
							<input type="hidden" name="id"/>
							</td>
							<th><em class="cred">*</em>用户账号：</th>
							<td><input class="easyui-validatebox ipt"  name="userAccount" id="userAccount" data-options="required:true,validType:'rangeLength[1,20]'"/></td>
						</tr>
						 <tr>
							<th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusAdd"  maxlength="1" data-options="required:true"/></td>
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