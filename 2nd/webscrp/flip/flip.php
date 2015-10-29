<?php

	if(isset($_REQUEST['str'])){

		$str = $_REQUEST['str'];
		$fStr ="";

		for($i = strlen($str) - 1; $i >= 0; $i--){
			$fStr .= $str{$i};
		}

		echo $fStr;
		
	}else{
		echo "Nothing input";
	}

?>