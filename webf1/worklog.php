<?php

	include('header.php');
	echo "<article class='worklog'>";
	include "/worklog/head.html";
	include "/worklog/post.php";
	include "/worklog/date.php";
	include "/worklog/tags.php";
	
	echo "<!-- Term 1 -->";
	
	$currentWeek = 12;
	
	for ($weekNo = 1; $weekNo <= $currentWeek; $weekNo++){
		include "/worklog/logs/" . $weekNo . ".php";
	}	

	echo "<!-- Term 2 -->";
	
	include "/worklog/foot.html";

	echo "</article>";
	
?>