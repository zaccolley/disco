$('document').ready(function(){

	timerInit();
	addNote();

	fixSlideHeight();

	$('.slide-group').css('-webkit-transform', 'translate3d(-320px, 0px, 0px)')

});

function fixSlideHeight(){
	$('.slide').height($('.content').height());
}

window.addEventListener('push', function(){ fixSlideHeight(); });