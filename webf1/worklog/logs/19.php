<?php

	$text = "<p>I put my site through " . createLink("http://wave.webaim.org/", "WAVE", "WAVE Web Accessibility Tool") . " an accessibility tool. It came up saying I needed to add things such as text to blank links. (I had used an empty link for the 'to the top' arrow button).</p>"
		  . "<p>Very useful tool although it didn't like my style sheet and didn't display it.</p>"
		  . "<p>I also ran my site through the colour blind tester called " . createLink("http://www.vischeck.com/vischeck/vischeckURL.php", "Vischeck", "Vischeck") . " to check if my colours would acceptable for people with color deficits. Some of the colours changed slightly but it was still readable.</p>"
		  . "<p>I did find the tool didn't work well for style sheets so it couldn't handle transparency...</p>";

	echo createPost("Accessibility", "19", strtotime("February 19 2013 15:00:00 GMT"), $text);

?>