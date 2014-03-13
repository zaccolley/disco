$('document').ready(function(){

	timerInit();
	addNote();

	fixSlideHeight();

});

function fixSlideHeight(){
	$('.slide').height($('.content').height());
}

window.addEventListener('push', function(){ fixSlideHeight(); });