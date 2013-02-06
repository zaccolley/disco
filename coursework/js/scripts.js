$(document).ready(function(){

	$dateNow = new Date();
	$formattedDate = $dateNow.getUTCDate() + "-" + $dateNow.getUTCMonth() + "-" + $dateNow.getUTCFullYear();
	$('time').html( $formattedDate );

});