<?php

	$text = "<p>Not a lot happened, prepping my USB stick with "
			  . createAbbr('XAMPP', 'X (cross platform), Apache HTTP Server, MySQL, PHP, Perl')
			  . " and the " . createLink('http://portableapps.com/', 'Portable Apps', 'Portable Apps') . " suite.</p>"
			  . "<p>Lecture was fairly interesting, I didn't know a lot about Internet browser history. The <q>Browser Wars</q>"
			  . "have gone on for longer than I though too. "
			  . "I did know a fair bit about browsers prior to the lecture from doing some web development in my spare time.</p>";

	echo createPost("Unit Introduction", "01", strtotime("September 25 2012 15:22:00 GMT"), $text);

?>