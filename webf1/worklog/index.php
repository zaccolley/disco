<?php

	include "html/header.html";
	include "php/post.php";
	include "php/date.php";
	include "php/tags.php";
	
	echo "<!-- Term 1 -->";
	
	$currentWeek = 12;
	
	for ($weekNo = 1; $weekNo <= $currentWeek; $weekNo++){
		include "php/worklog/" . $weekNo . ".php";
	}	

	echo "<!-- Term 2 -->";
	
	include "html/footer.html";
	
?>