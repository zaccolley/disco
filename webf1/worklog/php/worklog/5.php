<?php

	$text = "<p>Timothy came in for another lecture but this time talked about the Library's features and showed us the website and how to search the databases. "
	      . "There are surprising amount of resources I didn't know existed!</p><p>In the practical we went to the library and used the " . createLink('http://www.port.ac.uk/library/home/', 'University of Portsmouth Library', 'online')
		  . "eBook searching and catalogue to look for books and then went in the actual library to find them. I found a HTML5 book but I decided to just read it from the eBook later on.</p>"
		  . "<p>After the session was finished I looked at the Computing section as well as the journals. They have all these 1980s magazines on Computing with horrible bitmap images on the cover. It is glorious.</p>";

	echo createPost("Using the Library", "05", strtotime("October 23 2012 19:42:00 GMT"), $text);

?>