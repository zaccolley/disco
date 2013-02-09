<?php

$dateTime = strtotime("September 25 2012 15:22:00 GMT");

function generateDate($type, $dateTime){

	if (gmdate("T", $dateTime) == "GMT"){
		$timeZone = 'Z';
	}else{
		$timeZone = '#';
	}
	
	if ($type == 'long'){	
		echo gmdate("dS F Y - H:i:s", $dateTime);	
	}elseif ($type == 'short'){
		echo gmdate("d/m/y - H:i", $dateTime);	
	}elseif ($type == 'htmltimestamp'){
		echo gmdate("Y-m-d", $dateTime) . "T" . gmdate("H:i:s", $dateTime) . $timeZone;
	}else{
		echo $dateTime;	
		
	}

}

echo generateDate("short", $dateTime) . "\n";
echo " # ";
echo generateDate("long", $dateTime) . "\n";
echo " # ";
echo generateDate("htmltimestamp", $dateTime);

?>