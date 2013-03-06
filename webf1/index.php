<?php include('header.php'); ?>

	<article class="home">

		<a href="cv.php" class="tile cv cvtile">
			<section class="head">
				<ul>
					<li class="min"></li>
					<li class="max"></li>
					<li class="close">X</li>
				</ul>
				<h1>curriculum vitae - Notepad</h1>
			</section>

			<ul>
				<li>File</li>
				<li>Edit</li>
				<li>Format</li>
				<li>Help</li>
			</ul>

			<section class="textarea">
				<h1>My name is Zac Colley</h1>

				<p>----------</p>

				<p>&#009993;: <span class="link">z@ccolley.com</span></p>
				<p>&#009742;: 07534317671</p>

				<p>----------</p>

				<p>70 Stansted Road,</p>
				<p>Portsmouth,</p>
				<p>Hampshire,</p>
				<p>UK,</p>
				<p>PO5 1SA</p>
			</section>

		</a>

		<a href="litreview.php" class="tile litreviewtile">
			<h1>The evolution of mobile application design</h1>
			<p>This literature review will be discussing the evolution of mobile application design and how application design for mobile devices compares to desktop.</p>			
		</a>

		<a href="worklog.php" class="tile worklogtile">
			<h1>My Worklog</h1>
		</a>

		<section class="tile imagetile">

			<?php /* This grabs my gravatar or reverts to a default image if it can't get it. */
			
			$myEmail = "zaccolley@gmail.com";
			$defaultImg = "img/defaultimg.png";
			$imgDimensions = 100;
			$gravatarURL = "http://www.gravatar.com/avatar/" . md5($myEmail)  . "?d=" . urlencode($defaultImg) . "&amp;s=" . $imgDimensions;
		
			?>

			<img src="<?php echo $gravatarURL; ?>" alt="Gravatar image">

		</section>
		
		<section class="tile validatetile">
			<p>I've got the site validating to the standards for <a href="http://validator.w3.org/check?uri=referer" target="_blank">HTML</a>
			and for <a href="http://jigsaw.w3.org/css-validator/check/referer" target="_blank">CSS!</a></p>
		</section>

		<section class="tile videotile">
			<video src="video/scrollydownycodeything.mp4" controls></video>
		</section>

	</article>

<?php include('footer.php'); ?>