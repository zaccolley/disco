$(function(){		

	// cv scripts
	// ----------

	// So the button behaviours don't occur on the index page

	$path = window.location.pathname;
	$targetFile = "cv.php"; // What page we want

	// Get what would be the file if the URL is the one we're looking for
	$file = $path.substring($path.length - $targetFile.length); 

	if($file == "cv.php"){ // If this is the page we targeted ($targetFileName)

		$('.min').click(function(){	// If they minimise!
			$('.cv').css("width", "900px"); // SMALLER
		});

		$('.max').click(function(){	// If they maximise!		
			$('.cv').css("width", "90%"); // LARGER
		});

		$('.close').click(function(){ // If the close!
			$('.cv').hide();
			$('.cv').delay(250).fadeIn('50'); // Sneak back in... cheeky.
		});

	}	

	// worklog scripts
	// ---------------

	var animationSpeed = 1000

	$('a.toTheTop').click(function(){
		$('html, body').animate({scrollTop: 0}, animationSpeed); // Moves to the top of the window in 'animationSpeed'ms
		event.preventDefault();  // Stops the link's normal behaviour
	});

	$('li.active a').click(function(){				
		var hrefValue = $(this).attr('href'); // Grabs the href attribute from the clicked navigation link
		var postPosition = $(hrefValue).position().top;	// Finds the position from the top of the window for the heading with the ID 'hrefValue'
		var scrollAmount = postPosition - 5;  // -5 to move to above the heading at the top of the post
		$('html, body').animate({scrollTop: scrollAmount}, animationSpeed); // Moves to the top of the post in 'animationSpeed'ms
		event.preventDefault(); // Stops the link's normal behaviour
	});

});