<?php

	$text = "<p>Some of the content of this lecture I already knew. I found the descriptive vs. procedural part interesting. Descriptive does seem to be the way to go.</p>"
		  . "<p>I have done quite a lot of " . createAbbr('CSS', 'Cascading Style Sheets')
		  . " before but I hadn't played with the new webkit 3D technologies that Rich showcased in his lecture.</p>"
		  . "<p>The general format for a CSS declaration is: " . createCode('selector{ property:value; }') . "</p>"
		  . "<p>I didn't know about " . createAbbr('SGML', 'Standard Generalized Markup Language') . " which is what HTML seems to be heavily inspired with. "
		  . "There is " . createAbbr('DSSSL', 'Document Style Semantics and Specification Language') . " which is used to style SGML documents.</p>";
		  
	echo createPost("Separating Form and Content", "09", strtotime("November 20 2012 15:32:00 GMT"), $text);

?>