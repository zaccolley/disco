<?php include('header.php'); ?>
	
	<article class="cv">

		<section class="head"> <!-- the fake menu items at the top -->
			<ul>
				<li class="min"></li>
				<li class="max"></li>
				<li class="close"><a href="index.php">X</a></li>
			</ul>
			<h1>curriculum vitae - Notepad</h1>
		</section>

		<ul>
			<li>File</li>
			<li>Edit</li>
			<li>Format</li> 
			<li>Help</li>
		</ul>

		<section class="textarea" contenteditable="true"> <!-- actual content -->
			<h1>My name is Zac Colley</h1>

			<p>----------</p>

			<p>&#009993;: <a contenteditable="false" href="emailto:z@colley.com">z@ccolley.com</a></p>

			<p>----------</p>

			<p>This did have an old copy of my CV for my coursework but...</p>

			<p>You can <a contenteditable="false" href="mailto:z@ccolley.com">email me</a> for it or check out my <a contenteditable="false" href="http://uk.linkedin.com/in/zaccolley">LinkedIn</a> profile.</a></p>

		</section>

	</article>

<?php include('footer.php'); ?>