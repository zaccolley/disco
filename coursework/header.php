<?php
	$links =  array(
		"0" => array(
				"url" => "/webf1/coursework/index.php",
				"name" => "Home",
				),
		"1" => array(
				"url" => "/webf1/coursework/cv.php",
				"name" => "CV",
				),
		"2" => array(
				"url" => "/webf1/coursework/litreview.php",
				"name" => "Literature Review",
				),
		"3" => array(
				"url" => "/webf1/coursework/test.php",
				"name" => "Test",
				),
		);
	$currentURL = $_SERVER['PHP_SELF'];
	foreach ($links as $link){
		if ($currentURL == $link["url"]){
			$title = "- " . $link["name"];
		}
	}

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Zac Colley <?php echo($title); ?></title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="js/jquery.js" type="text/javascript"></script>  <!-- jQuery! :D -->
	<script src="js/scripts.js" type="text/javascript"></script> <!-- My scripts -->
</head>
<body>
	
	<header>
		<section class="links">
			<?php
				foreach ($links as $link){
					if ($currentURL == $link["url"]){						
						$currentPageClass = "class='current'";
					}else{
						$currentPageClass = "";
					}
					echo "<a " . $currentPageClass . " href='" . $link['url'] . "'>" . $link['name'] . "</a> \n";
				}	
			?>
		</section>
		<h1>Zac Colley</h1>
	</header>