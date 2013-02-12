<?php

	$text = "<p>The lecture involved presentation technique and reflective writing, I have done presentations before in high school but that was quite a long time ago. "
		  . "I felt I was pretty good at it, I did get nervous though. Some of the points she made were helpful, such as breathing and taking time to check notes when "
		  . "<q>drying</q> up.</p><p>It is something I hadn't thought about, physically controlling yourself. I will consider this should I present and feel nervous.</p>"
		  . "<p>Reflection seems key to working out what I know what I need to concentrate on. It should help with revision immensely.</p>"
		  . "<p>At the time of writing this the previous entries were different. However two members of my class looked through what I had wrote and gave me feedback. "
		  . "Terry said he thought my work had a good level of reflection and Brad added that the first and third entries of my worklog need more attention in terms of reflection and quantity.</p>"
		  . "<p>I will go through and add more detail as well as reflection as as of writing they are a bit too descriptive which is not useful.</p>";
		  
	echo createPost("Techniques: Presenting &amp; Reflecting", "08", strtotime("November 12 2012 16:47:00 GMT"), $text);

?>