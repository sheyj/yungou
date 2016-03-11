<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="Keywords" content=" , ,应用管理平台" />
<meta name="Description" content=" , ,应用管理平台" />
<title>应用管理平台</title>
<#include  "/WEB-INF/ftl/common/header.ftl" >

<link href="<@s.url "/resources/css/login.css" />" rel="stylesheet" />

<script>
     $(document).ready(function(){
	   if(top != self) {
       top.onbeforeunload = function() {};
       top.location.replace(self.location.href);
      }
	
   });
</script>

</head>

<body class="bdy" >
<div class="lgn-bd-top"></div>
<div class="lgn-bd">
    <div class="wrap rel" >
        <div class="lgn-t">
        </div>
        <div class="lgn-m">
        </div>
        <div class="lgn-b">
        </div>
        <div class="lgn-form">
             <form id="dataForm" action="<@s.url "/login" />" method="post" >
              <input type="hidden" name="flag" value="submit" >
              <input type="hidden" name="cookieFlag" id="cookieFlag" value='0'>
                <div class="lgn-form-con">
                    <p>
                        <input type="text" class="lgn-ipt" value="" id="loginName" name="loginName" placeholder="请输入用户名" class="easyui-validatebox" required="true" missingMessage='请输入用户名!' style="font-size:14px;font-weight:900" />
                    </p>
                    <p class="mt20">
                        <input type="password" class="lgn-ipt" value="" id="loginPassword" name="loginPassword" placeholder="请输入密码" class="easyui-validatebox" required="true" missingMessage='请输入密码!' style="font-size:14px;font-weight:900" />
                    </p>
                    <p class="clearfix mt20">
                        <i class="lgn-rmb-chk fl jsChk">&nbsp;</i>
                        <span class="fl ml3 mt3 jsChk">记住密码</span>
                        &nbsp;&nbsp;<span><font size="+2" color="red"  style="font-size:9p">${error}</font></span>
                    </p>
                    <p class="clearfix mt20">
                        <span class="fl">
                        <input type="button" class="lgn-sbmt-btn" value="" onclick="checkForm();" />
                        </span>
                        <span class="fl ml10">
                        <input type="reset" class="lgn-reset-btn" value="" />
                        </span>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
<script>

function checkForm(){

	var fromObj=$('#dataForm');
	 var validateForm= fromObj.form('validate');
	     if(validateForm==false){
	          return ;
	     }
	     
	if($('#loginName').val()==''){
		$('#loginName').focus();
		return false;
	}
	
	if($('#loginPassword').val()==''){
		$('#loginPassword').focus();
		return false;
	}
	

	
	$('#dataForm').submit();
}

  document.onkeydown = function(e){
    
    
        var e = e || window.event;
        var keyCode = e.keyCode || e.which;
        var tg = e.srcElement || e.target;
        if(keyCode == 13){
            checkForm();
        }
	}
	

$('.jsChk').click(function(){
	var _this=$('.lgn-rmb-chk');
	if(_this.hasClass('chked')){
	    $('#cookieFlag').attr('value','0');
		_this.removeClass('chked');
	}else{
	    $('#cookieFlag').attr('value','1');
		_this.addClass('chked');
	}
});


</script>
</body>
</html>
