<#--
尺码横排的表头
-->
<#macro sizeTypeColumn  sizeTypeMap      sizeTypeFiledName  preColNames  endColNames>

<#assign typeSizeV="${(sizeTypeMap?size)?number}" >

<#assign rowspan="${typeSizeV?number-2}">

<#assign preColNamesV="${preColNames?size}">

<#assign endColNamesV="${endColNames?size}">




    <#if (rowspan  >= 0)&&(rowspan!=-1)  > 
        <#if rowspan gt 0 >
             <#assign n = rowspan?number-1>
                 <#-- 循环多出的行 -->
		         <#list 0..n as i >
		            [
		              <#-- 第一行 前面合并 --> 
		              <#if i=0>
		                   {title : '',width : 80,editor : 'validatebox',rowspan:${rowspan},colspan:${preColNamesV} ,align:"left"},
		              </#if>
		              <#-- 尺码种类 表头处理 strating -->
	                   <#assign k=0 >
	                   <#list sizeTypeMap?keys as key>
	                       <#--判断2个循环体的顺序 -->
	                        <#if k=i >
	                            <#assign diffCols="${typeSizeV?number-(sizeTypeMap[key]?size)}" >
	                            {title : "${key}",width : 50,editor : {type:'validatebox'},align:"left"},
	                            <#list sizeTypeMap[key] as item>
							           {title : "${item}",width : 50,editor : 'validatebox',align:"left"},
							     </#list>
							     <#--判断每个类型个数  与总个数比较-->
							     <#if diffCols?number gt 0>
							         <#list 1..diffCols?number as temp >
							               {title :'',width : 50,editor : 'validatebox',align:"left"},
							         </#list>
							         
							     </#if>
							     
	                            <#break>
	                        </#if>
	                        <#assign k=(k?number)+1>
	                   </#list> 
	                   <#-- 尺码种类处理 end -->
	                   
	                  <#-- 处理后排字段数据 --> 
	                  <#if i=0>
	                       <#if endColNamesV?number gt 0 >
	                            {title : '',width : 80,editor : 'validatebox',rowspan:${rowspan},colspan:${endColNamesV} ,align:"left"},
	                       </#if>
	                  </#if>
	                   
		            ],
		         </#list>
        </#if>
    
            <#--第2行======当中有2个或者2个以上尺码分类时-->
			  <#list 1..0 as ii >
			       [  
				        <#if ii=1>
				            <#list preColNames as item>
                                  {field:"${item.preColValus}",title : "${item.preColNames}",width : 80,editor : 'validatebox',rowspan:2,align:"left"},   
                            </#list>          
				         </#if>
				        <#assign k2=0 >
				        <#list sizeTypeMap?keys as key2>
				           
				           <#if (sizeTypeMap?size-1-ii)=k2>
				               <#assign diffCols2="${typeSizeV?number-(sizeTypeMap[key2]?size)}" >
				                   <#-- 这里做判断的原因是为了防止重复写 field: ,上面是List循环的 -->
				                   <#if ii=1>
				                       {field:"${sizeTypeFiledName}",title : "${key2}",width : 50,editor : 'validatebox',align:"center"},
				                       <#else>
				                       {title : "${key2}",width : 50,editor : 'validatebox',align:"left"},
				                   </#if>
				               <#list sizeTypeMap[key2] as item2>
						            <#if ii=1>
				                       {field:"V${item2_index+1}",title : "${item2}",width : 50,editor : 'validatebox',align:"center"},
				                       <#else>
				                       {title : "${item2}",width : 50,editor : 'validatebox',align:"left"},
				                    </#if>
						       </#list>
						       <#--判断每个类型个数  与总个数比较-->
						     <#if diffCols2?number gt 0>
						         <#list 1..diffCols2?number as temp2 >
						            <#if ii=1>
						                 {field:"V${sizeTypeMap[key2]?size+temp2}",title :'',width : 50,editor : 'validatebox',align:"center"},
						                 <#else>
						                 {title :'',width : 50,editor : 'validatebox'},
						            </#if>
						            
						         </#list>
						         
						     </#if>
				               <#break>
				           </#if>
				           <#assign k2=(k2?number)+1>
				      </#list>
				     
				      <#-- 处理后排字段数据 --> 
				      <#if ii=1>
				          <#if endColNamesV?number gt 0 >
				             <#list endColNames as item3>
                                  {field:"${item3.preColValus}",title : "${item3.preColNames}",width : 80,editor : 'validatebox',rowspan:2},   
                             </#list>  
				          </#if>
				      </#if>
				      
			      ],
			  </#list>
		  	 
                
               
            <#else>      
    </#if>
    

</#macro>

 