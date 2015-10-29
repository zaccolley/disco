<?php

	$text = "<p>I knew a bit of PHP before this lecture. I had meddled with the GD library but to be honest that consisted of me copy and pasting.</p>"
		  . "<p>I decided to do some reading in PHP and see what I could do. For my worklog here I'm using PHP to collate the worklogs together. I only have to create one file with the week number and it generates the rest.</p>"
		  . "<p>Also I am using PHP to sepArate out my header from my main content for maintainability. I used include statements to bring the different files together: "
		  . createCode("include('header.php');") . "</p>"
		  . "<p>I also wrote some (now in hindsight messy) code to handle the dates too:</p>"
		  . createImage("img/datecode.png", "Snipped of code showing the date function", "");

	echo createPost("Basic PHP and Website Creation", "15", strtotime("January 22 2013 15:00:00 GMT"), $text);

?>