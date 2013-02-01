<?php

	$text = "<p>Rich asked us what design meant. I was talking to people near me and we came up with <q>a plan from an idea</q>.</p>"
		  . createBlockQuote('http://en.wikipedia.org/wiki/Design', 'Wikipedia', 'Design is the creation of a plan or convention for the construction of an object or a system')
		  . "<p>We were fairly close but we missed out the key idea of creation with the planning. The word <q>design</q> can sometimes wrongly be used for just the looks of a object. "
		  . "It's more than that&hellip;</p><p>One thing Rich said was about was mastery: <q title='Rich Boakes'>Never be satisfied that you know everything</q>.</p>"
		  . "<p>I think this is important because you can become content with the knowledge you know because it is good enough but in web, "
		  . "an ever changing field of technology, you can't know everything and what you do know will become outdated fast.</p>";
		  
	echo createPost("Design", "12", strtotime("December 11 2012 18:24:00 GMT"), $text);		

?>