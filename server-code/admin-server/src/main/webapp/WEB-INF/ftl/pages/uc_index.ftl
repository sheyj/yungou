<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta charset="utf-8" />
<meta name="Keywords" content="百丽物流总部管理平台" />
<meta name="Description" content="百丽物流总部管理平台" />
<title>百丽物流总部管理平台</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >
<script src="resources/js/uc_index.js"></script>
</head>
<body class="easyui-layout">
<div id="loading"><p>加载中，请稍后...</p></div>
<div id="header" data-options="region:'north'">
    <div class="header_nav">
        <a class="logo" href="#">标志</a>
        <div class="bd">
            <span class="wel">您好！${(Session["session_user"].username)!}</span> 
            <span class="ml20"><a id="lnkDesk" href="javascript:;">系统桌面</a> | <a href="javascript:updatePassword()">修改密码</a> | <a target="_blank" href=" http://10.0.30.84:3100/index" class="c-white" >返回用户中心</a> | <a target="_top" href="<@s.url "/uc_logout"/>">[退出]</a>
            </span>
        </div>
        <div id="timerSpan" class="timer-span"></div>
    </div>
</div>
<div id="left" data-options="region:'west',split:true,title:'目录导航',iconCls:'text-list-bullets',minWidth:180,maxWidth:180,minSplit:true">
    <div class="easyui-accordion" id="leftMenu" data-options="split:true,border:false,fit: true, animate: false"  style="border:none;" >
    </div>
</div>
<div id="main" data-options="region:'center'">
    <div id="mainTabs" class="easyui-tabs" data-options="fit:true,border:false" tools="#tab-tools">
        <div title="系统桌面"  data-options="icon:'icon-home'">
            <div class="pd10">
               		<img src="<@s.url "/resources/images/welcome.jpg"/>" />
            </div>
        </div>
    </div>
</div>
<div id="tab-tools" style="display:none;border-left:none;border-top:none;">
    <a href="javascript:void(0)" class="easyui-linkbutton" plain="true" id="tabToolsFullScreen" iconCls="icon-window-max">全屏</a>
</div>
</body>
</html>
