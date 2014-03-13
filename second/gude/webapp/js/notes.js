function addNote(){
	
	$('.note-compose button').on('touchstart', function(){

		var message = $('.note-compose textarea').val();

		if(message != ''){

			var timestamp = Math.round(new Date().getTime() / 1000),
				date = new Date(timestamp*1000),
				hours = date.getHours(),
				minutes = date.getMinutes(),
				time = hours + ':' + minutes;


			$('.notes').append('<li data-time="'+time+'" class="note">'+message+'</li>');
			$('.note-compose textarea').val('');

			$('.content').animate({ scrollTop: $(window).height() }, 'fast');
		}

	});

}