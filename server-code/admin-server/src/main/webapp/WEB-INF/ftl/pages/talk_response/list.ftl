<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>用户评论查询</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script type="text/javascript" src="<@s.url "/resources/js/talk_response/talk_response.js?version=${version}"/>"></script>
</head>
<body class="easyui-layout">
     <#-- 工具菜单div -->
	 <div data-options="region:'north',border:false" class="toolbar-region">
	  		<@p.toolbar id="toolbar"  listData=[
		    	{"title":"查询","iconCls":"icon-search","action":"talkResponse.searchInfo()", "type":0},
		        {"title":"清除","iconCls":"icon-remove","action":"talkResponse.searchClear()", "type":0},
				{"title":"修改","iconCls":"icon-edit","action":"talkResponse.editInfo()","type":2},
                {"title":"导出","iconCls":"icon-export","action":"talkResponse.exportExcel()","type":4}
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
						    <th>用户名称：</th>
		        		    <td><input class="easyui-validatebox ipt" name="fromUserNameLike" id="fromUserNameLikeCondition" />
		        		    </td>
		        		    <th>用户账号：</th>
		        		    <td><input class="easyui-validatebox ipt" name="userAccountLike" id="userAccountCondition" /></td>
		        		    
		        		    <th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusCondition" /></td>
		        		    
					      </tr>
					      <tr>
					      	<th>评论时间：</th>
		        		    <td><input class="easyui-datebox ipt" data-options="maxDate:'responseTimeEnd'" name="responseTimeStart" id="responseTimeStart" /></td>
		        		    <th>至&nbsp;</th>
			        		<td><input class="easyui-datebox ipt" data-options="minDate:'responseTimeStart'"  name="responseTimeEnd" id="responseTimeEnd"/>
			        		</td>
					      </tr>
					   </tbody>
					</table>
				  </form>
			  </div>
			</div>
			<#-- 数据列表div -->
		    <div data-options="region:'center',border:false">
	          	 <@p.datagrid id="dataGridJG"  loadUrl="" saveUrl=""  defaultColumn="" title="用户评论列表"
			      		isHasToolBar="false" divToolbar="#searchDiv"  onClickRowEdit="false"  pagination="true"
				        rownumbers="true"  emptyMsg="" singleSelect="false"
				        columnsJsonList="[
				                  {field : 'ck',checkbox:true,notexport:true},
				                  {field : 'fromUserName',title : '用户名称',width : 100,align:'left'},
				                  {field : 'id',title : '',hidden:'true'},
				                  {field : 'responseTime', title : '注册时间', width : 150,align:'left'},
				                  {field : 'statusName',title : '状态',width : 150,align:'left'},
				                   {field : 'status',title : '',hidden:'true'},
				                  {field : 'responseMsg',title : '评论内容',width : 150,align:'left'}
				                 ]"   
				                 jsonExtend='{onDblClickRow:function(rowIndex, rowData){
	                                   //双击方法
			                            talkResponse.loadDetail(rowData);
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
							<input type="hidden" name="id"/>
							<th>状态：</th>
							<td><input class="easyui-validatecombox ipt"  name="status" id="statusAdd"  maxlength="1" data-options="required:true"/></td>
						 </tr>
			         </tbody>
               </table>
	       </form>
       </div>
       
</body>
</html>