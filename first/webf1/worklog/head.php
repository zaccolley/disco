	<article id="wrapper">

			<section class="head">
				<h1>My Worklog</h1>
			</section>

			<nav>
				
				<ul>
					<?php
					for($i = 1; $i < 25; $i++){
						if($i < $fileCount - 1){
							if($i < 10){
								$i = "0" . $i;
							}
							echo "<li class='active'><a href='#" . $i . "'>" . $i . "</a></li>\n";
						}else{
							echo "<li class='inactive'><a href='#'>" . $i . "</a></li>\n";
						}
					}
					?>					
				</ul>
			
			</nav>

			<!-- Term 1 -->
		