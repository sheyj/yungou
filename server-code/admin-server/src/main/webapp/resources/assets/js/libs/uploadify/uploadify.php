<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

// Define a destination
require_once("../inc/common.php");
$mysql=new mysql;
$usr='10001';
$path='';
$cat='0';
$size='0';
if(isset($_POST['cat']))
{
	$cat=$_POST['cat'];
}

function isExits($path,$mysql,$usr)
{
	$result=false;
	$mysql->query("select id from tb_usrfiles where path='".$path."' and usr='".$usr."'");
	if($mysql->num_rows()>=1)
	{
		$result=true;
	}
	return $result;
}
	
function add($usr,$path,$cat,$size,$mysql)
{
   if(!isExits($path,$mysql,$usr))
   {
  	 $result=$mysql->insert("tb_usrfiles","usr,path,cat,size","".$usr."','".$path."','".$cat."','".$size);
   }
}

function formatSize($size)
{
	if($size<1024)
	{
		return round($size,1).'B';
	}
	if(1024<$size && $size<1024*1024)
	{
		return round(($size/1024),1).'KB';
	}
	if(1024*1024<$size && $size<1024*1024*1024)
	{
		return round(($size/(1024*1024)),1).'M';
	}
}


$targetFolder = '/uploads'; // Relative to the root
$verifyToken = md5('unique_salt' . $_POST['timestamp']);

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
	$targetFile = rtrim($targetPath,'/') . '/' . $_FILES['Filedata']['name'];
	$path=$targetFolder. '/' . $_FILES['Filedata']['name'];
	// Validate the file type
	$fileTypes = array('jpg','jpeg','gif','png','rar','wmv','mp4','swf','mpeg'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	$size=$_FILES['Filedata']['size'];
	if (in_array($fileParts['extension'],$fileTypes)) {
		add($usr,$path,$cat,formatSize($size),$mysql);
		move_uploaded_file($tempFile,iconv("UTF-8","gb2312", $targetFile));
		add($usr,$path,$cat,formatSize($size),$mysql);
		echo '1';
	} else {
		echo 'Invalid file type.';
	}
}
?>