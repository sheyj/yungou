<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>APP版本维护</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script type="text/javascript" src="<@s.url "/resources/js/app_version/app_version.js?version=${version}"/>"></script>
</head>
<body class="easyui-layout">
     <#-- 工具菜单div -->
	 <div data-options="region:'north',border:false" class="toolbar-region">
	  		<@p.toolbar id="toolbar"  listData=[
		    	{"title":"查询","iconCls":"icon-search","action":"appVersion.searchInfo()", "type":0},
		        {"title":"清除","iconCls":"icon-remove","action":"appVersion.searchClear()", "type":0},
				{"title":"新增","iconCls":"icon-add","action":"appVersion.addInfo()","type":1},
				{"title":"修改","iconCls":"icon-edit","action":"appVersion.editInfo()","type":2},
                {"title":"删除","iconCls":"icon-del","action":"appVersion.delInfo()","type":3},
                {"title":"导出","iconCls":"icon-export","action":"appVersion.exportExcel()","type":4}
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
						    <th>APP版本号：</th>
		        		    <td><input class="easyui-validatebox ipt" name="versionNoLike" id="versionNoCondition" />
		        		    </td>
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
	          	 <@p.datagrid id="dataGridJG"  loadUrl="" saveUrl=""  defaultColumn="" title="APP版本"
			      		isHasToolBar="false" divToolbar="#searchDiv"  onClickRowEdit="false"  pagination="true"
				        rownumbers="true"  emptyMsg="" singleSelect="false"
				        columnsJsonList="[
				                  {field : 'ck',checkbox:true,notexport:true},
				                  {field : 'versionNo',title : 'APP版本号',width : 100,align:'left'},
				                  {field : 'apkPath',title : 'APK路径',width : 120,align:'left'},
				                  {field : 'isForce',title : '是否强制更新',width : 120,align:'left'},
				                  {field : 'id',title : '',hidden:'true'},
				                  {field : 'publishDate',title : '发布日期',width : 120,align:'left'},
				                  {field : 'createTime', title : '创建时间', width : 150,align:'left'},
				                  {field : 'modifyContent',title : '修改内容',width : 200,align:'left'}
				                 ]"   
				                 jsonExtend='{onDblClickRow:function(rowIndex, rowData){
	                                   //双击方法
			                            appVersion.loadDetail(rowData);
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
							<th><em class="cred">*</em>APP版本号：</th>
							<td><input class="easyui-validatebox ipt"  name="versionNo" id="versionNo" data-options="required:true,validType:'rangeLength[1,20]'"/>
							<input type="hidden" name="id"  />
							</td>
							<th><em class="cred">*</em>APK路径：</th>
							<td><input class="easyui-validatebox ipt"  name="apkPath" id="apkPath" data-options="required:true,validType:'rangeLength[1,20]'"/></td>
						</tr>
						<tr>
							<th><em class="cred">*</em>是否强制更新：</th>
							<td><input class="easyui-validatecombox ipt"  name="isForce" id="forceAdd"  maxlength="1" data-options="required:true"/></td>
							<th><em class="cred">*</em>发布日期：</th>
							<td><input  class="easyui-datebox ipt"  name="publishDate"  data-options="required:true"/></td>
						</tr>
						<tr>
							<th>修改内容：</th>
							<td><input class="easyui-validatebox ipt" name="modifyContent" id="modifyContent" maxlength="100" ></input></td>
						</tr>
			         </tbody>
               </table>
	       </form>
       </div>
       
</body>
</html>