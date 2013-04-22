<?php

function createPost($title, $no, $dateTime, $text){

	$heading = "<a href='#" . $no . "' id='" . $no . "'><h2>" . $title . "</h2></a>";
	$details = "<span title='" . generateDate('long', $dateTime) . "'>"
			 . "Week " . $no . " &#8226; <time datetime='" . generateDate('htmltimestamp', $dateTime) . "'>"
			 . generateDate('short', $dateTime) . "</time></span>";

	$output = "<!-- Week " . $no ." -->"
		    . "<article class='post'><section class='top'>"
			. $heading . $details
			. "</section><section class='content'>"
			. $text
			. "</section></article>";
			
	return $output;
}

?>