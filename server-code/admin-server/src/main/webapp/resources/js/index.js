var maxTab = false;//最大化
var dgSelectorOpts=null;//弹窗选择器

function parsePage(){
	InitLeftMenu('#leftMenu');

	$('#tabToolsFullScreen').click(function(){
		changeScreen();
	});
	
	$('#lnkDesk').click(function(){
		addTab({
		title: '系统桌面'
		});
	});
	
	//setTimerSpan();
	
	$('#loading').remove();
	
}

//修改密码
function updatePassword(){
	openwindow("toUpdateLoginSystemUserPassword.htm",450,250,"密码修改");
}

//全屏切换
function changeScreen() {
    if (maxTab) {
       // $('body').layout('show', 'west');
        $('body').layout('show', 'north');
        $('body').layout('show', 'south');
				if ($.util.supportsFullScreen) {
         	$.util.cancelFullScreen();
       	 }
        maxTab = false;
        $('#tabToolsFullScreen').linkbutton({
            iconCls: "icon-window-max",
            text: "全屏"
        });
    } else {
        $('body').layout('hidden', 'south');
       // $('body').layout('hidden', 'west');
        $('body').layout('hidden', 'north');
				
				if ($.util.supportsFullScreen) {
						$.util.requestFullScreen();
				} 
        maxTab = true;
        $('#tabToolsFullScreen').linkbutton({
            iconCls: "icon-window-min",
            text: "正常"
        });
    }
}


//初始化左侧
function InitLeftMenu(obj) {
	$(obj).html('<p class="loading16">&nbsp;</p>');
    $.getJSON(BasePath+"/user_tree.json", function(data){
		  $.each(data[0].children, function(i,m){
		  	var id='panel'+i;
		    $(obj).accordion('add', {
		    	id:id,
				title: m.text,
				selected: false
			});
			
			//add menus
			var p = $('<div></div>').appendTo("#"+id);
			p.tree({
					data:[m],
					checkbox:false,
					lines:true,
					onClick:function(node){
					if(node.attributes.url==undefined||node.attributes.url==null){
						return;
					}
					if (!$(this).tree("isLeaf", node.target)) {
                        $(this).tree('toggle', node.target);
                        return;
                    }
                    
                    var title = node.text,
                    iconCls = node.iconCls,
                    url = node.attributes.url,
                    isiframe = true;
                    if(url.indexOf('?')>0){
					   url+='&moduleId='+node.id;
					}else{
					   url+='?moduleId='+node.id;
					}
                    addTab({
                        title: title,
                        icon: iconCls,
                        href: url,
                        iframed: isiframe,
                        closabled: true
                    });
                    }
                    
			});
			
		  });
		  	$('.loading16').remove();
		  	$(obj).accordion('select',0);
		});
		
		
}


function setTimerSpan(){
	var timerSpan = $("#timerSpan"), 
	interval = function () { 
		timerSpan.text($.date.toLongDateTimeString(new Date()));
	};
	interval();
	window.setInterval(interval, 1000);
};