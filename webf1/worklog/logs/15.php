<?php

	$text = "<p><em>Note: I missed this lecture. :¬(</em></p>"
		  . "<p>I do love me some mobile devices though.</p>";

	echo createPost("Mobile Devices, Mobility & the Mobile Web", "15", strtotime("January 22 2013 15:00:00 GMT"), $text);

?>