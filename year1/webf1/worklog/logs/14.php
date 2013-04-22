<?php

	$text = "<p>I've used images before. Generally you should only use the tag if the element is actually an image for semantics. Such as a photo gallery image.</p>"
		  . "<p>Things like logos should be handled with CSS and put as a background.</p>"
		  . "<p>Using HTML5 videos is really a faff.</p>"
		  . "<p>The browsers all have different formats that they require to display the video and they come with codecs too.</p>"
		  . "<p>It is however pretty exciting as it means we don't have to use flash players to run videos</p>";

	echo createPost("Using Media", "14", strtotime("January 15 2013 15:00:00 GMT"), $text);

?>