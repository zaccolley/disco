<?php

	$text = "<p>" . createCode('Editor\'s note: I\'ve yet to do this because I\'m lazy.') ."</p>";
	
	echo createPost("Academic Writing", "11", strtotime("December 4 2012 20:01:00 GMT"), $text);

?>