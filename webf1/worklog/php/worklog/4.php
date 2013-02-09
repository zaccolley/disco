<?php

	$text = createImage('http://www.text2mindmap.com/grddRA', 'img/Text2MindMap.png', 'Mindmap', 'right')
		  . "<p>Timothy Collinson came in for a lecture to talk about mind-maps. At first I thought it was odd subject for Web Fundamentals but it was actually pretty useful.</p>"
		  . "<p>I mind-mapped the next few lectures and the amount of information you can store on one page is impressive. "
		  . "It also means you can make more natural notes instead of trying to format them as you take them.</p>"
		  . "<p>In the practical session we looked at different forms of medium for mind-mapping. "
		  . "I had already done two on paper but then I created one using the website " . createLink('http://www.text2mindmap.com/', 'Text2Mindmap', 'Text2Mindmap') . " (see image above).</p>"
		  . "<p>I liked how the online version was easy to add and remove but it is was too static in terms of size and placement of bubbles and there was no room for doodles.</p>";

	echo createPost("Mind Maps", "04", strtotime("October 16 2012 15:47:00 GMT"), $text);

?>