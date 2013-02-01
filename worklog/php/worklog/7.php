<?php

	$text = "<p>Richard collated all our worklogs (at least the ones submitted) and stripped them so they were just markup tags. "
		  . "Then he bulk validated and analysed the data to receive some data.</p><p>I noticed the tags he was looking for such as "
		  . createCode('&lt;article&gt;') . " and " . createCode('&lt;section&gt;') . " I used extensively.</p>";
		  
	echo createPost("Worklog Review", "07", strtotime("November 06 2012 15:24:00"), $text);

?>