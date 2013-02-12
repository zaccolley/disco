$(document).ready(function(){

	// worklog scripts

	var animationSpeed = 1000

	$('a.toTheTop').click(function(){
		$('html, body').animate({scrollTop: 0}, animationSpeed);              // Moves to the top of the window in 'animationSpeed'ms
		event.preventDefault(); 					                          // Stops the link's normal behaviour
	});

	$('li.active a').click(function(){				
		var hrefValue = $(this).attr('href'); 						          // Grabs the href attribute from the clicked navigation link
		var postPosition = $(hrefValue).position().top;			              // Finds the position from the top of the window for the heading with the ID 'hrefValue'
		var scrollAmount = postPosition - 5;					              // -5 to move to above the heading at the top of the post
		$('html, body').animate({scrollTop: scrollAmount}, animationSpeed);   // Moves to the top of the post in 'animationSpeed'ms
		event.preventDefault(); 								              // Stops the link's normal behaviour
	});

});