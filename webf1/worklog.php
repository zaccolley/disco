<?php

	$d = dir("worklog/logs");
	$fileCount = 0;
	while (false !== $d->read()) {
	   $fileCount++;
	}
	$d->close();

	$currentWeek = $fileCount - 2;
	
	include('header.php');
	echo "<article class='worklog'>";
	include "worklog/head.php";
	include "worklog/post.php";
	include "worklog/date.php";
	include "worklog/tags.php";
	
	echo "<!-- Term 1 -->";
	
	for ($weekNo = $currentWeek; $weekNo > 0; $weekNo--){
		include "worklog/logs/" . $weekNo . ".php";
	}	

	echo "<!-- Term 2 -->";
	
	include "worklog/foot.html";

	echo "</article>";
	
?>