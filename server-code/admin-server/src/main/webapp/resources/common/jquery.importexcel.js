(function($) {
	var defaults = {
		submitUrl : '',
		templateName : '',
		params : {},
		success:function(){},
		error:function(){}
	};

	var importExcel = {
		opts : {},
		dialog : null,
		open : function(o) {
			opts = o;
			var $uploadForm = null;
			dialog = ygDialog({
				isFrame: true,
				cache : false,
				title : '导入',
				modal:true,
				showMask: false,
				width:'400',
				height:'160',
				href : BasePath + "/to/import",
				buttons:[{
					text:'上传',
					iconCls:'icon-upload',
					handler:function(self){
						$uploadForm.submit();
					}
				},{
					text:'下载模板',
					iconCls:'icon-download',
					handler:function(){
						window.location.href=BasePath + '/download?fileName='+ o.templateName;
					}
				}],
				onLoad:function(win,dialog){
					$uploadForm = dialog.$('#uploadForm');
					$uploadForm.attr('action',BasePath+o.submitUrl);
				}
			});
		},
		close : function(){
			dialog.panel('close');
		},
		success : function(){
			opts.success.call();
		},
		error : function(){
			opts.error.call();
		}
	};

	$.importExcel = function(options) {
		$.fn.importExcel.open(options);
	};

	$.importExcel.open = function(options) {
		var opts = $.extend({}, defaults, options);
		importExcel.open(opts);
	};

	$.importExcel.success = function(){
		return importExcel.success();
	};
	
	$.importExcel.error = function(){
		return importExcel.error();
	};
	
	$.importExcel.colse = function(){
		return importExcel.close();
	};
})(jQuery);