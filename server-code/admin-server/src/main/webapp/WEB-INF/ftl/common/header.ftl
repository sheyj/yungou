
<script type="text/javascript" src="<@s.url "/resources/boot.js?version=${version}" />"></script>
<script type="text/javascript" src="<@s.url "/resources/js/common.js?version=${version}"/>"></script>
<script type="text/javascript" src="<@s.url "/resources/common/easyui.validate.extends.js?version=${version}"/>"></script>
<link rel="stylesheet" type="text/css" href="<@s.url "/resources/css/base.css?version=${version}"/>"/>
<link rel="stylesheet" type="text/css" href="<@s.url "/resources/css/common-td.css?version=${version}"/>"/>
<#assign BasePath = springMacroRequestContext.getContextPath()/>
<script>
	   var BasePath = '${springMacroRequestContext.getContextPath()}';
	   
	   //关闭选项卡窗口
	   function closeWindow(menuName){
		    var tab = parent.$('#mainTabs').tabs('getSelected');
		    var index = parent.$('#mainTabs').tabs('getTabIndex',tab);
		    parent.$('#mainTabs').tabs('close',index);
	   }
	   
</script>