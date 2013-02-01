<?php

	$text = "<p>Peter Millard came in and talked about different subjects including privacy and eDemocracy. "
	      . "To be honest I found the lecture hard to follow as it didn't seem to flow together.</p><p>He also doesn't understand the term "
		  . createLink('http://www.urbandictionary.com/define.php?term=trolling', 'trolling', 'Trolling')
		  . ". Trolling is when you aggravate/harass a person (normally a stranger) online for no more reason than to give an emotional response. "
		  . "He was using it as a blanket statement for harassment on the web.</p><p>Otherwise, he had some interesting points. "
		  . "I do think the eDemocracy is an interesting idea but I don't think it will be implemented anytime soon because it gives more power to the public.</p>";
		  
	echo createPost("Different Theories of the Web", "06", strtotime("October 30 2012 15:30:00 GMT"), $text);

?>