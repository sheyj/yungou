<#--

weihaijin 2013-06-26

preColSpan: 前面 业务头
<#assign preColNamesV="${preColNames?split(',')?size}">
-->
<#macro tableGridEdit    sizeTypeMap   preColNames    maxSortCount  >
<#include  "/WEB-INF/ftl/common/header.ftl" >
<style type="text/css">
table{border-collapse:collapse;border-spacing:0;}
th,td{border-right:1px solid #888;border-bottom:1px solid #888;padding:5px 15px;border-left:1px solid #888;border-top:1px solid #888}
th{font-weight:bold;background:#ccc;}

.tr_bg{
  background-color:#DDD;
}
.td_bg{
 border-left:0px solid #888;
 border-top:0px solid #888;
 background-color:#FFF;
 
}


.text { border:1px; 
	text-align: center;
	color: black;
	background-color: white;
	width: 100%;
	height: 100%;
	line-height:20px;
	font-size: 11;} 

</style>

 <script type="text/javascript">
       
 
    document.onkeydown = function(e){
    
    
        var e = e || window.event;
        var keyCode = e.keyCode || e.which;
        var tg = e.srcElement || e.target;
        if(keyCode == 13){
            if(tg.type == "text"){
                var tabIndex = tg.tabIndex;
                tabIndex++;
				

            }
        }

	   var Input = document.getElementsByTagName("input");
        for(var i =0;i < Input.length;i++){
            if(Input[i].type == "text"){
                if(Input[i].tabIndex == tabIndex){
                    if(tg.title.indexOf("sizeType")!=-1){
                         var inputTxt=tg.value;
                         if(inputTxt!=null&&inputTxt!=''){
                            inputTxt=inputTxt.trim();
                         }
                         var  flag=false;
                          <#list sizeTypeMap?keys as keyJS>
					            var tempJS="${keyJS}";
					            if(tempJS==inputTxt){
					                var sizeTypeMapVV="${sizeTypeMap[keyJS]?size}";
					                flag=true;
					            }
				         </#list>
				         if(!flag){
				            alert("尺码类型输入有误,必须是上面存在的尺码类型！");
				            tg.value="";
				            tg.focus();
				        }else{
				           //非尺码类型不能输入 
				           var maxSortCountVV="${maxSortCount}";
				           if(parseInt(sizeTypeMapVV)<parseInt(maxSortCountVV)){
				                 var firstDisableIndex=(parseInt(tabIndex)+parseInt(sizeTypeMapVV));
				                 var endDisableIndex=(parseInt(tabIndex)+parseInt(maxSortCountVV)-1);
				                 for(var k=firstDisableIndex;k<=endDisableIndex;k++){
				                     var disableInput= document.getElementById(k);
				                     disableInput.readOnly=true;
				                     
				                 }
				           }
				      
				           
				           Input[i].focus();
				        }
                    }else{
                       Input[i].focus();
                    
                    }
                }
            }
        }
        
    }  
    

</script> 
  
 <script type="text/javascript">
     function doSave(){
          var pageSizePreColNamesSize="${preColNames?size}";
          var pageSizeMaxSortCount="${maxSortCount}";
          var pageSize=parseInt(pageSizePreColNamesSize)+parseInt(pageSizeMaxSortCount)+1;
          var firstDisableIndex=parseInt(pageSizePreColNamesSize);
          var sizeTypeInput=document.getElementById(firstDisableIndex+1);
          
          var sizeTypeInputV=sizeTypeInput.value;
          
         
 
         
          var jsonObj="";
          
          jsonObj+='{';
          
         
         <#assign itemCellIndex=1> 
         <#list preColNames as itemCell>
             jsonObj+='"'+"${itemCell.preColValus}" +'":'  
             var itemCellVauleById=document.getElementById("${itemCellIndex}")
             jsonObj+='"'+itemCellVauleById.value+'"';
             <#if itemCellIndex=(preColNames?size)>
                 <#else>
                    jsonObj+=",";
             </#if>
             <#assign itemCellIndex=(itemCellIndex?number)+1>                
         </#list>  
          
          
          jsonObj+=',"mxList1":[';
          
           <#list sizeTypeMap?keys as keyInputKey>
				  var keyInputKey="${keyInputKey}";
				  if(keyInputKey==sizeTypeInputV){
					  <#assign sizeTypeInputSizeV="${sizeTypeMap[keyInputKey]?size?number}">
					  
					  var temp='';
					  <#list 1..(sizeTypeInputSizeV?number) as iii >
					     
					      var cellSizeTypeId=parseInt(firstDisableIndex)+parseInt("${iii?number}")+1;
					      var cellSizeTypeValue=document.getElementById(cellSizeTypeId);
					      
					      var cellSizeTypeFixed="${sizeTypeMap[keyInputKey][iii-1]}";
					      
					      if(cellSizeTypeValue.value!=null&&cellSizeTypeValue.value!=''){
					         
					          
					          if(temp!=null&&temp!=''){
					             temp+=',';
					          }
					           temp+='{'+'"sizetype":"'+sizeTypeInputV+'","sizenum":"'+cellSizeTypeFixed+'","amount":"'+cellSizeTypeValue.value+'"}';
					        
					     }
					 </#list>
					 jsonObj+=temp; 
					  
				  }
		  </#list>
          
         jsonObj+=']'; 
         jsonObj+='}';
         
       var data={
          "jsonObj":jsonObj
       };
        
        var url="addSizeTypeList.htm";
	    
	    ajaxRequest(url,data,function(result){
			if(!result) return ;
			
			if(result.length == ""){
				alert("修改失败");
				return ;
				
			}
			
			
			
			alert("修改成功");
	   });
        
         
   }
   
   //发达ajax请求
function ajaxRequest(url,reqParam,callback){
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: true,
		  success: callback
	});
}

</script>



<#assign typeSizeV="${(sizeTypeMap?size)?number}" >

<#assign preColNamesV="${preColNames?size}">

<#assign rowspan="${typeSizeV?number-2}">



<#assign maxSortCountV="${maxSortCount?number}">

<P>
<table >
	     <#if (rowspan  >= 0)&&(rowspan!=-1)  > 
	     
	       <#if rowspan gt 0 >
		         <#assign n = rowspan?number-1>
		         <#--循环多出的行 -->
		         <#list 0..n as i >
		              
		             <tr class='tr_bg' >
		                
		               <#-- 最前面动态合并处理   空白 --> 
			           <#if i=0>
		                 <td colspan="${preColNamesV}" rowspan="${rowspan}" width="100" class="td_bg"></td>
		               </#if>
	                   
	                   
	                   <#-- 尺码种类 表头处理 strating -->
	                   <#assign k=0 >
	                   <#list sizeTypeMap?keys as key>
	                       <#--判断2个循环体的顺序 -->
	                        <#if k=i >
	                            <#assign diffCols="${maxSortCountV?number-(sizeTypeMap[key]?size)}" >
	                            <td>${key}</td>  
	                            <#list sizeTypeMap[key] as item>
							          <td> ${item}</td>
							     </#list>
							     <#--判断每个类型个数  与总个数比较-->
							     <#if diffCols?number gt 0>
							         <#list 1..diffCols?number as temp >
							               <td></td>
							         </#list>
							         
							     </#if>
							     
	                            <#break>
	                        </#if>
	                        <#assign k=(k?number)+1>
	                   </#list> 
	                   <#-- 尺码种类处理 end -->
						
	                 </tr>	
		          </#list>  
	      </#if>   
	             
			  <#--当中有2个或者2个以上尺码分类时-->
			  <#list 1..0 as ii >
			       <tr class='tr_bg'>  
				        <#if ii=1>
				            <#list preColNames as item>
                                  <td rowspan="2">${item.preColNames}</td>     
                            </#list>          
				         </#if>
				        <#assign k2=0 >
				        <#list sizeTypeMap?keys as key2>
				           
				           <#if (sizeTypeMap?size-1-ii)=k2>
				               <#assign diffCols2="${maxSortCountV?number-(sizeTypeMap[key2]?size)}" >
				               <td>${key2}</td>
				               <#list sizeTypeMap[key2] as item2>
						          <td> ${item2}</td>
						       </#list>
						       <#--判断每个类型个数  与总个数比较-->
						     <#if diffCols2?number gt 0>
						         <#list 1..diffCols2?number as temp2 >
						               <td></td>
						         </#list>
						         
						     </#if>
				               <#break>
				           </#if>
				           <#assign k2=(k2?number)+1>
				      </#list>
				      
				      
			      </tr>
			  </#list>
		  	 
                
               
            <#else>      
        </#if>      
        
           
          
        <#if (rowspan=-1)  >
        <#--当中有一个尺码分类时-->
               <tr class='tr_bg'>
                    
                   
                   <#list preColNames as item>
                           <td rowspan="1">${item.preColNames}</td>     
                    </#list>  
					
					 <#list sizeTypeMap?keys as key3>
					      <td>${key3}</td>
				          <#list sizeTypeMap[key3] as item3>
						          <td> ${item3}</td>
						 </#list>
					 
					 </#list>
					
                 </tr>	 
                 
          <#else>

        </#if>
    
   <#-- 编辑行 -->
    <tr>
           <#assign index=1>
           <#list preColNames as item>
             
                  <td height="25" width="35" ><input type="text"    class="text" id="${index}" tabIndex="${index}" title="${index}"  /></td> 
             
                  
              <#assign index=index?number+1>
           </#list>  
    
	       <#assign maxSort="${maxSortCountV?number}" > 
		  <#if maxSort?number gt 0>
		        
				<#list 0..maxSort?number as tempMx >
				     
				      <#if tempMx?number==0>
				          <td height="25" width="35"><input type="text"      class="text"  id="${index}" tabIndex="${index}" title="${index}sizeType"     /></td>
					  <#else>
					     <td height="25" width="35"><input type="text"    class="text"  id="${index}" tabIndex="${index}" title="${index}"  onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" /></td>
					  </#if>   
					  <#assign index=index?number+1>
				</#list>
					         
		   </#if>
    </tr>

	

	 
					 
					 
					 
   
	</table>

<#rt/>
</#macro>