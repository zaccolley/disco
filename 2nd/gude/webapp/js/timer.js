timerStates = ["In the shop?",
			   "Received your order?",
			   "Received a receipt?",
			   "Out of the shop?"];

timerStateCount = 1;

function timerInit(){

	console.log("Timer initialised");

	$('.startstop-timer').on('touchend', function(){
		
		if($('.startstop-timer').hasClass('btn-positive')){
			$('.timer').find('#sw_reset').trigger('click');
			$('.timer').find('#sw_start').trigger('click');
		}else if($('.startstop-timer').hasClass('btn-negative')){
			timerStateCount = 0;
			$('.timer').find('#sw_stop').trigger('click');
		}

		$('.startstop-timer').removeClass('btn-negative');
		$('.startstop-timer').removeClass('btn-positive');
		$('.startstop-timer').removeClass('btn-primary');

		if(timerStateCount == 0){
			$('.startstop-timer').addClass('btn-positive');
		}else if(timerStateCount == timerStates.length-1){
			$('.startstop-timer').addClass('btn-negative');
		}else{
			$('.startstop-timer').addClass('btn-primary');
		}

		$('.startstop-timer').text(timerStates[timerStateCount]);
		timerStateCount++;

	});
}