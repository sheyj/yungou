<#--

weihaijin 2013-06-26

preColSpan: 前面 业务头
<#assign preColNamesV="${preColNames?split(',')?size}">
尺码横排宏
sizeTypeMap: 尺码类型Map  <尺码类型,该尺码下分类的对象List>   A-125\130\134 B-S\M\L\XL
maxSortCount:尺码种类个数
preColNames:尺码前显示的其他非尺码信息
listData：业务数据 主表里面放明细List
-->
<#macro tableGrid  sizeTypeMap maxSortCount  preColNames listData    >
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
</style>



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
    
    <#--业务数据 -->   
    
<#if listData?if_exists >              
    <#list  listData as itemData>
       <tr>
        
         <#list preColNames as item>
              <#assign preColValusV="${item.preColValus}">
              <td>${itemData[preColValusV]}</td>
          </#list>
          
           
       <#if  itemData.stockVoMap?if_exists>
	            <#list itemData.stockVoMap?keys as mxKey>
	                   <td>${mxKey}</td>
	                                            
	                  <#list sizeTypeMap[mxKey] as temp>
	                  
	                      <td>${(itemData.stockVoMap[mxKey][temp])!""}</td> 
	                  </#list>
	                  <#assign diffColsMx="${maxSortCountV?number-(sizeTypeMap[mxKey]?size)}" > 
	                  <#if diffColsMx?number gt 0>
							<#list 1..diffColsMx?number as tempMx >
								  <td></td>
							</#list>
								         
					 </#if>
					 
	             </#list> 
	             
	        <#else>
	           <#list 0..maxSortCountV?number as tempMxElse >
								  <td></td>
			  </#list>     
       </#if>    
        
       </tr>

    </#list>
</#if>   
   
   
   
	</table>

<#rt/>
</#macro>