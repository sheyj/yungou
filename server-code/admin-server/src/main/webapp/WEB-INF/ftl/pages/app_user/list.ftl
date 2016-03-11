<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>APP用户维护</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script type="text/javascript" src="<@s.url "/resources/js/app_user/app_user.js?version=${version}"/>"></script>
</head>
<body class="easyui-layout">
     <#-- 工具菜单div -->
	 <div data-options="region:'north',border:false" class="toolbar-region">
	  		<@p.toolbar id="toolbar"  listData=[
		    	{"title":"查询","iconCls":"icon-search","action":"appUser.searchInfo()", "type":0},
		        {"title":"清除","iconCls":"icon-remove","action":"appUser.searchClear()", "type":0},
				{"title":"修改","iconCls":"icon-edit","action":"appUser.editInfo()","type":2},
                {"title":"导出","iconCls":"icon-export","action":"appUser.exportExcel()","type":4}
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
						    <th>用户名称：</th>
		        		    <td><input class="easyui-validatebox ipt" name="userNameLike" id="userNameCondition" />
		        		    </td>
		        		    <th>用户账号：</th>
		        		    <td><input class="easyui-validatebox ipt" name="userAccountLike" id="userAccountCondition" /></td>
		        		    
		        		    <th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusCondition"  maxlength="1" data-options="required:true"/></td>
		        		    
					      </tr>
					      <tr>
					      	<th>注册时间：</th>
		        		    <td><input class="easyui-datebox ipt" data-options="maxDate:'registerTimeEnd'" name="registerTimeStart" id="registerTimeStart" /></td>
		        		    <th>至&nbsp;</th>
			        		<td><input class="easyui-datebox ipt" data-options="minDate:'registerTimeStart'"  name="registerTimeEnd" id="registerTimeEnd"/>
			        		</td>
					      </tr>
					   </tbody>
					</table>
				  </form>
			  </div>
			</div>
			<#-- 数据列表div -->
		    <div data-options="region:'center',border:false">
	          	 <@p.datagrid id="dataGridJG"  loadUrl="" saveUrl=""  defaultColumn="" title="APP用户"
			      		isHasToolBar="false" divToolbar="#searchDiv"  onClickRowEdit="false"  pagination="true"
				        rownumbers="true"  emptyMsg="" singleSelect="false"
				        columnsJsonList="[
				                  {field : 'ck',checkbox:true,notexport:true},
				                  {field : 'userName',title : '用户名称',width : 100,align:'left'},
				                  {field : 'userAccount',title : '用户账号',width : 120,align:'left'},
				                  {field : 'userMobile',title : '联系电话',width : 120,align:'left'},
				                  {field : 'id',title : '',hidden:'true'},
				                  {field : 'userBirthday',title : '生日',width : 120,align:'left'},
				                  {field : 'registerTime', title : '注册时间', width : 150,align:'left'},
				                  {field : 'statusName',title : '状态',width : 150,align:'left'},
				                   {field : 'status',title : '',hidden:'true'},
				                  {field : 'remark',title : '备注',width : 150,align:'left'}
				                 ]"   
				                 jsonExtend='{onDblClickRow:function(rowIndex, rowData){
	                                   //双击方法
			                            appUser.loadDetail(rowData);
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