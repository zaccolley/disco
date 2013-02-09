<?php

	$text = "<p>Lecture included information about the different " . createAbbr('HTML', 'HyperText Markup Language') . " version which was informative. "
			  . "I have looked at XHTML which I knew of but wasn't aware of what it actually did.</p><p>I find Rich's stance on browsers catching up to the standards interesting, "
			  . "it doesn't seem practical in a work enviroment as supporting some of the lesser browsers (e.g " . createAbbr('IE6', 'Internet Explorer 6') . ") can unfortunately be a specification by a client. "
			  . "In an academic setting however I do agree with his thoughts on it and will be validating and ignoring inconsistencies in browsers.</p>"
			  . "<p>Practical section we did some basic coding and used " . createLink('http://www.apachefriends.org/en/xampp.html', 'XAMPP', 'XAMPP') . " to host the files. "
			  . "Didn't need to for just HTML but it's good to know for when we implement things like .php files etc...</p>"
			  . "<p>I made this worklog also, it's not finished but it's a decent start. I may not add to it as it only needs to be simple.</p>";
			  
	echo createPost("HTML Basics and Web Standards", "02", strtotime("October 2 2012 12:18:00 GMT"), $text);

?>