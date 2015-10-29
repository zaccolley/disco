<?php

	$text = "<p>This lecture was lack luster in my eyes. I couldn't really engage with it.</p><p>However, the topic was fairly interesting. "
	  . "What happens when a company is more powerful than a government body? Peter explained that some companies are no longer multinational but transnational. "
	  . "Transcending countries and their borders.</p><p>The idea seems far fetched but as companies, such as " . createLink('https://www.facebook.com', 'Facebook', 'Facebook')
	  . ", hold data about our lives that governments do not they can control us in different ways.</p>"
	  . "<p>It seems like Facebook will never be shut down or replaced with another social network because people's lives are so invested in it. "
	  . "Our pictures, events and groups are hosted there. It'll take a lot for it to die.</p>";

	echo createPost("The Power of the Transnational Corporations", "10", strtotime("November 27 2012 16:14:00 GMT"), $text);

?>