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

	}	

	// scrolling scripts
	// ---------------

	// link that takes you to the top
	$('.toTheTop').click(function(){ scrollPage(this); });

	// worklog nav 
	$('.worklog li.active a').click(function(){	scrollPage(this); });

 	// inline referencing in the lit review
	$('.litreview mark a').click(function(){ scrollPage(this); });

	function scrollPage($clicked) {
		$animationSpeed = 1000 // Speed of the animation in ms
		$url = window.location.protocol + "//" + window.location.host + window.location.pathname; // Get current URL
		$id = String($clicked).substr($url.length); // Take the URL and leave the # part
		$headerHeight = 100; // Height of header
		if($id == "#"){ // If the '.toTheTop' is clicked
			$scrollAmount = 0; // The top of the page
		}else{ // If the '.toTheTop' hasn't been clicked
			$postPosition = $($id).position().top;	// Finds the position from the top of the window for the heading with the ID 'hrefValue'
			$scrollAmount = $postPosition - $headerHeight;  // How far scrolled down minus the height of the header
		}
		$('html, body').animate({scrollTop: $scrollAmount}, $animationSpeed); // Moves to the top of the post in 'animationSpeed'ms
		event.preventDefault(); // Stops the link's normal behaviour
	}

});