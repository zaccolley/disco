<?php

	$text = "<p>Kelly Biggs, a careers adviser, spoke to us in the morning lecture. She talked about CVs, and how Purple Doors can help with support. "
		  . "I didn't know about the formalities such as not putting your date of birth which is on my current CV so it seems like they will be valuable in improving it.</p>"
		  . "<p>In the practical we searched for jobs. I first looked at the current jobs with " . createLink('http://www.soundcloud.com', 'Soundcloud', 'Soundcloud')
		  . " as I like what they do and they have been growing a lot recently. "
		  . "I then picked a more generic Web Developer role which requires more skills and seems more challenging in general.</p>";
		  
	echo createPost("Preparing Your CV", "03", strtotime("October 9 2012 15:28:00 GMT"), $text);

?>