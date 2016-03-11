<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>UploadiFive Test</title>
<script src="../admin/js/jquery-1.4.2.min.js"></script>
<script src="jquery.uploadify.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="uploadify.css">
<style type="text/css">
body {
	font: 13px Arial, Helvetica, Sans-serif;
}

/*uploadify*/
.uploadify{position:relative;margin-bottom:1em;}
.uploadify-button{background-color:#505050;background-image:linear-gradient(bottom,#505050 0%,#707070 100%);background-image:-o-linear-gradient(bottom,#505050 0%,#707070 100%);background-image:-moz-linear-gradient(bottom,#505050 0%,#707070 100%);background-image:-webkit-linear-gradient(bottom,#505050 0%,#707070 100%);background-image:-ms-linear-gradient(bottom,#505050 0%,#707070 100%);background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#505050),color-stop(1,#707070));background-position:center top;background-repeat:no-repeat;-webkit-border-radius:30px;-moz-border-radius:30px;border-radius:30px;border:2px solid #808080;color:#FFF;font:bold 12px Arial,Helvetica,sans-serif;text-align:center;text-shadow:0 -1px 0 rgba(0,0,0,0.25);width:100%;}
.uploadify:hover .uploadify-button{background-color:#606060;background-image:linear-gradient(top,#606060 0%,#808080 100%);background-image:-o-linear-gradient(top,#606060 0%,#808080 100%);background-image:-moz-linear-gradient(top,#606060 0%,#808080 100%);background-image:-webkit-linear-gradient(top,#606060 0%,#808080 100%);background-image:-ms-linear-gradient(top,#606060 0%,#808080 100%);background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#606060),color-stop(1,#808080));background-position:center bottom;}
.uploadify-button.disabled{background-color:#D0D0D0;color:#808080;}
.uploadify-queue{border-top:3px solid #f2f2f2;border-bottom:3px solid #f2f2f2;padding:0 0 20px 15px;margin-top:20px;}
.uploadify-queue:after{clear:both;display:block;content:''}
.uploadify-queue-item{float:left;position:relative;margin:20px 15px 0 0;width:140px;height:140px;border:1px solid #E5E5E5;padding:5px;}
.uploadify-error{background-color:#FDE5DD !important;}
.uploadify-queue-item .cancel a{background:url(../images/uploadify-cancel.png) 0 0 no-repeat;float:right;height:16px;text-indent:-9999px;width:16px;margin-right:5px;margin-top:5px; overflow:hidden;}
.uploadify-queue-item .fileName{position:absolute;bottom:10px;}
.uploadify-queue-item.completed{background-color:#E5E5E5;}
.uploadify-progress{background-color:#E5E5E5;margin-top:60px;width:100%;}
.uploadify-progress-bar{background-color:#0099FF;height:3px;width:1px;}
</style>
</head>

<body>
	<h1>Uploadify Demo</h1>
	<form>
		<div id="queue"></div>
        类型：
        <select id="fileType" name="fileType">
        	<option value="0">图片</option>
            <option value="1">视频</option>
            <option value="2">动画</option>
        </select>
        <br>
		<input id="file_upload" name="file_upload" type="file" multiple>
        <input id="btnUpload" name="btnUpload" type="button" value="上传" onClick="javascript:$('#file_upload').uploadify('upload','*');" style="display:none;"/>
	</form>

	<script type="text/javascript">
		<?php $timestamp = time();?>
		 
		/*配置php.ini限制
		post_max_size = 2500M
		memory_limit = 200M
		max_file_uploads = 2048M
		upload_max_filesize = 2048M
		*/
		
		$(function() {
			$('#file_upload').uploadify({
				'formData'     : {
					'timestamp' : '<?php echo $timestamp;?>',
					'token'     : '<?php echo md5('unique_salt' . $timestamp);?>'
				},
				'swf':'uploadify.swf',
				'uploader':'uploadify.php',
				'auto':true,
				'debug':false,
				'buttonText':'选择文件',
				'cancelImg':'uploadify-cancel.png',  
     			'folder': '/uploads',  
				'queueSizeLimit':4,
				'simUploadLimit':2,
				'fileSizeLimit':'500MB',
				'fileTypeExts': '*.jpg;*.png;*.gif', 
				'fileTypeDesc':'图片格式',
				'removeCompleted':false, 

            	//'queueID':'fileQueue',  
                'multi': true,
				'onFallback':function(){             //检测FLASH失败调用
					alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
				},
				'onSelectError':function(file, errorCode, errorMsg){  //返回一个错误，选择文件的时候触发
					switch(errorCode) {
						case -100:
						alert("上传的文件数量已经超出系统限制的"+$('#file_upload').uploadify('settings','queueSizeLimit')+"个文件！");
						break;
						case -110:
						alert("文件 ["+file.name+"] 大小超出系统限制的"+$('#file_upload').uploadify('settings','fileSizeLimit')+"大小！");
						break;
						case -120:
						alert("文件 ["+file.name+"] 大小异常！");
						break;
						case -130:
						alert("文件 ["+file.name+"] 类型不正确！");
						break;
					}
				},
				'onSelect':function(){
					//$("#btnUpload").show();
					$('#file_upload').hide();
				},
				
				'onUploadSuccess':function(file, data, response){  //上传到服务器，服务器返回相应信息到data里
					data={'src':'test.jpg','title':'图片名称','':''};
					if(data){
						var queueId=file.id;
						var _box=$('#'+queueId);
						var _src=data.src;
						var _title=data.title;
						var _html=$('<div><a href="javascript:;" class="pic jsSelPic"><img alt="" src="'+_src+'"><i class="sys_del_btn jsDelPic"></i><s class="sys_check_ok"></s></a>\
                        <p class="ttl">'+_title+'</p></div>');
						_box.html(_html);
					//var dataObj=eval("("+data+")");//转换为json对象 
					//$('#uploadify').uploadify('upload')
					}
				}

			});
		});
		
		$("#fileType").change(function(){
			if($(this).val()=="0")
			{
				$('#file_upload').uploadify('settings','fileTypeDesc','图片格式(*.jpg;*.gif;*.png)');
				$('#file_upload').uploadify('settings','fileTypeExts','*.jpg;*.gif;*.png');
			}
			if($(this).val()=="1")
			{
				$('#file_upload').uploadify('settings','fileTypeDesc','视频格式(*.wmv;*.mp4;*.mpeg)');
				$('#file_upload').uploadify('settings','fileTypeExts','*.wmv;*.mp4;*.mpeg');
			}
			if($(this).val()=="2")
			{
				$('#file_upload').uploadify('settings','fileTypeDesc','动画格式(*.swf)');
				$('#file_upload').uploadify('settings','fileTypeExts','*.swf;*.mp4;*.mpeg');
			}
			$('#file_upload').uploadify('settings','formData',{'cat':$(this).val()});
			//$("#file_upload-queue").empty();
			$('#file_upload').uploadify('cancel', '*');
			$("#btnUpload").hide();
		});
		
	</script>
</body>
</html>