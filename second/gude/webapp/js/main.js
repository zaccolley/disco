$('document').ready(function(){

	$('.timer-button').click(function(){
		console.log('Clicked timer')
		if($(this).hasClass('btn-negative')){
			$(this).text('Start timer');
		}else{
			$(this).text('Stop timer');
		}
		$(this).toggleClass('btn-positive');
		$(this).toggleClass('btn-negative');

	});

});