<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>用户说说管理</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script type="text/javascript" src="<@s.url "/resources/js/user_talk/user_talk.js?version=${version}"/>"></script>
</head>
<body class="easyui-layout">
     <#-- 工具菜单div -->
	 <div data-options="region:'north',border:false" class="toolbar-region">
	  		<@p.toolbar id="toolbar"  listData=[
		    	{"title":"查询","iconCls":"icon-search","action":"userTalk.searchInfo()", "type":0},
		        {"title":"清除","iconCls":"icon-remove","action":"userTalk.searchClear()", "type":0},
				{"title":"修改","iconCls":"icon-edit","action":"userTalk.editInfo()","type":2},
                {"title":"导出","iconCls":"icon-export","action":"userTalk.exportExcel()","type":4}
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
						    <th>用户Id：</th>
		        		    <td><input class="easyui-validatebox ipt" name="userId" id="userIdCondition" />
		        		    </td>
		        		    <th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusCondition"  /></td>
		        		     <th>可见范围：</th>
							<td><input class="easyui-validatecombox ipt"  name="talkType" id="talkTypeCondition"  /></td>
					      </tr>
					      <tr>
					      	<th>说说时间：</th>
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
	          	 <@p.datagrid id="dataGridJG"  loadUrl="" saveUrl=""  defaultColumn="" title="用户说说列表"
			      		isHasToolBar="false" divToolbar="#searchDiv"  onClickRowEdit="false"  pagination="true"
				        rownumbers="true"  emptyMsg="" singleSelect="false"
				        columnsJsonList="[
				                  {field : 'ck',checkbox:true,notexport:true},
				                  {field : 'userId',title : '用户ID',width : 100,align:'left'},
				                  {field : 'talkType',title : '范围',width : 120,align:'left'},
				                  {field : 'location',title : '位置',width : 120,align:'left'},
				                  {field : 'id',title : '',hidden:'true'},
				                  {field : 'createTime', title : '说说时间', width : 150,align:'left'},
				                  {field : 'statusName',title : '状态',width : 150,align:'left'},
				                   {field : 'status',title : '',hidden:'true'},
				                  {field : 'talkContent',title : '说说内容',width : 150,align:'left'}
				                 ]"   
				                 
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
							<input type="hidden" name="id"/>
							<th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusAdd"   data-options="required:true"/></td>
						</tr>
			         </tbody>
               </table>
	       </form>
       </div>
       
</body>
</html>