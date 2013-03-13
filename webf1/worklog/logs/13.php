<?php

	$text = "<p>I have used the waterfall method before on projects at college and so was familiar with this.</p>"
		  . "<p>I had used rapid prototyping as a method of coding before but didn't know it had a name.</p>"
		  . "<p>I've decided to use git for my version control on the project and use GitHub to help me keep track of the code. GitHub has a system called 'issues' which is essentially a to-do list. I'll use this to track my tasks and work through them.</p>"
		  . createImage('http://www.github.com/zaccolley', 'img/githubscreen.png', 'Github Issues screenshot', 'center')
		  . "<p>Here are some of my commits from the repo:</p>"
		  . createImage('http://www.github.com/zaccolley', 'img/githubcommitsscreen.png', 'Github Issues screenshot', 'center');

	echo createPost("Project Management Issues", "13", strtotime("January 08 2013 15:00:00 GMT"), $text);

?>