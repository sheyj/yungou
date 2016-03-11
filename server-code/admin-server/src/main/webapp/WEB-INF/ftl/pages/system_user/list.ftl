<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>系统用户维护</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script type="text/javascript" src="<@s.url "/resources/js/system_user/system_user.js?version=${version}"/>"></script>
</head>
<body class="easyui-layout">
     <#-- 工具菜单div -->
	 <div data-options="region:'north',border:false" class="toolbar-region">
	  		<@p.toolbar id="toolbar"  listData=[
		    	{"title":"查询","iconCls":"icon-search","action":"systemUser.searchInfo()", "type":0},
		        {"title":"清除","iconCls":"icon-remove","action":"systemUser.searchClear()", "type":0},
				{"title":"新增","iconCls":"icon-add","action":"systemUser.addInfo()","type":1},
				{"title":"修改","iconCls":"icon-edit","action":"systemUser.editInfo()","type":2},
              <#--  {"title":"删除","iconCls":"icon-del","action":"systemUser.delInfo()","type":3},-->
                {"title":"导出","iconCls":"icon-export","action":"systemUser.exportExcel()","type":4}
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
                    <col width="18" />
                    <col/>
	                 <tbody>
						<tr>
						    <th>用户名称：</th>
		        		    <td><input class="easyui-validatebox ipt" name="usernameLike" id="usernameCondition" />
		        		    </td>
		        		    <th>登录用户名：</th>
		        		    <td><input class="easyui-validatebox ipt" name="loginNameLike" id="loginNameCondition" /></td>
		        		    <th>创建时间：</th>
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
	          	 <@p.datagrid id="dataGridJG"  loadUrl="" saveUrl=""  defaultColumn="" title="系统用户"
			      		isHasToolBar="false" divToolbar="#searchDiv"  onClickRowEdit="false"  pagination="true"
				        rownumbers="true"  emptyMsg="" singleSelect="false"
				        columnsJsonList="[
				                  {field : 'ck',checkbox:true,notexport:true},
				                  {field : 'userid',title : '用户ID',width : 100,align:'left'},
				                  {field : 'username',title : '用户名称',width : 120,align:'left'},
				                  {field : 'loginName',title : '登录用户名',width : 120,align:'left'},
				                  {field : 'status',title : '',hidden:'true'},
				                  {field : 'statusName',title : '状态',width : 80,align:'left'},
				                  {field : 'createTime', title : '创建时间', width : 150,align:'left'},
				                  {field : 'updateTime',title : '修改时间',width : 150,align:'left'},
				                  {field : 'remark',title : '备注',width : 150,align:'left'}
				                 ]"   
				                 jsonExtend='{onDblClickRow:function(rowIndex, rowData){
	                                   //双击方法
			                            systemUser.loadDetail(rowData);
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
							<td><input class="easyui-validatebox ipt"  name="username" id="username" data-options="required:true,validType:'rangeLength[1,20]'"/>
							<input type="hidden" name="userid" id="useridCondition" />
							</td>
							<th><em class="cred">*</em>用户登录名：</th>
							<td><input class="easyui-validatebox ipt"  name="loginName" id="loginName" data-options="required:true,validType:'rangeLength[1,20]'"/></td>
						</tr>
						<tr>
							<th><em class="cred">*</em>用户登录密码：</th>
							<td><input type="password" class="easyui-validatebox ipt"  name="loginPassword" id="loginPassword" data-options="required:true,validType:'rangeLength[1,20]'"/></td>
							<th><em class="cred">*</em>确认登录密码：</th>
							<td><input type="password" class="easyui-validatebox ipt"  name="reLoginPassword" id="reLoginPassword"  data-options="required:true,validType:'rangeLength[1,20]'"/></td>
						</tr>
						 <tr>
						 	<th>联系电话：</th>
							<td><input class="easyui-validatebox ipt"  name="mobilePhone" id="mobilePhone"  maxlength="20" data-options="validType:'number'"/></td>
							<th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusCondition"  maxlength="1" data-options="required:true"/></td>
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