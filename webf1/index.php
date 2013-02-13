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

				<hr>

				<p>&#009993;: <span class="link">z@ccolley.com</span></p>
				<p>&#009742;: 07534317671</p>

				<hr>

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
		
		<a class="tile validatetile" href="http://validator.w3.org/check?uri=referer" target="_blank">
			<p>By golly gosh, I've only gone and got it to validate to the standards!</p>
		</a>

		<a class="tile validatetile" href="http://jigsaw.w3.org/css-validator/check/referer" target="_blank">
			<p>and so does the CSS!</p>
		</a>

		<section class="tile videotile">
			<video src="video/scrollydownycodeything.mp4" controls></video>
		</section>

	</article>

<?php include('footer.php'); ?>