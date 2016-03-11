
<div id="errorShow"  class="easyui-window" title="操作发生异常提示"  
    style="width:500px;height:300px"   
    data-options="modal:true,resizable:false,draggable:false,collapsible:false,closed:true,
    minimizable:false"> 
    <div style='padding:30px' >
      
	     <table>
	        <tr>
	           <td ></td>
	           <td>错误代码：<span id="errorCode"></span>&nbsp;&nbsp;<a href="javascript:errorDetailFun()"><font color="red">异常详情</font></a></td>
	        </tr>
	        
	        <tr>
	            <td ></td>
	           <td>错误信息：<br>&nbsp;&nbsp;<span id="errorMessage"></span></td>
	        </tr> 
	     </table>
    </div>   
    <div id="errorDetail" style='padding:10px;display:none' >
                                
    </div>
</div>  

<script>
    errorDetailFun=function(){
        var errorDetail=document.getElementById("errorDetail");
        if(errorDetail.style.display=="none"){
            errorDetail.style.display="block";
        }else if(errorDetail.style.display=="block"){
            errorDetail.style.display="none";
        }
    }
    showErrorWindow=function(data){
         var errorDetail=document.getElementById("errorDetail");
         errorDetail.style.display="none";
         $('#errorCode').html(data.errorCode);
         $('#errorMessage').html(data.errorMessage);
         $('#errorDetail').html(data.errorDetail);
         $('#errorShow').window('open'); 
    }
</script>
