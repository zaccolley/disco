<?php

function generateDate($type, $dateTime){

	if (gmdate("T", $dateTime) == "GMT"){
		$timeZone = 'Z';
	}else{
		$timeZone = '#';
	}
	
	if ($type == 'long'){	
		return gmdate("jS F Y - H:i:s", $dateTime);	
	}elseif ($type == 'short'){
		return gmdate("d/m/y - H:i", $dateTime);	
	}elseif ($type == 'htmltimestamp'){
		return gmdate("Y-m-d", $dateTime) . "T" . gmdate("H:i:s", $dateTime) . $timeZone;
	}else{
		return $dateTime;			
	}	
}

?>