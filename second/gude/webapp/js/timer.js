function timerInit(){

	console.log("Timer initialised");

	$('.startstop-timer').on('touchstart', function(){
		console.log('Clicked timer', $(this).attr('data-state'));

		if($(this).attr('data-state') == "stopped"){
			timerStart();
		}else{
			timerStop();
		}

	});

	$('.clear-timer').on('touchstart', timerClear);
}

function timerStop(){

	console.log("Timer stopped");
	
	clearInterval(timer);

	$('.startstop-timer').text('Start timer');
	$('.startstop-timer').attr('data-state', "stopped");

	$('.startstop-timer').removeClass('btn-primary');
	$('.startstop-timer').addClass('btn-positive');
	
}

function timerStart(){

	console.log('Timer started');

	$('.startstop-timer').text('Pause timer');
	$('.startstop-timer').attr('data-state', "running");

	$('.startstop-timer').addClass('btn-primary');
	$('.startstop-timer').removeClass('btn-positive');

	// initial press
	timerInc();
	timer = window.setInterval(timerInc, 100);

}

function timerInc(){

	console.log("Timer incremented", $('.timer-display').text());

	var currentTime = +$('.timer-display').text();
	$('.timer-display').text(currentTime + 1);

}

function timerClear(){

	console.log("Timer cleared");

	if(timer){
		timerStop();

		$('.timer-display').text('0');
	}

}