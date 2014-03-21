$('document').ready(function(){ docLoad(); });
window.addEventListener('push', function(){  docLoad(); });

function docLoad(){
	timerInit();
	addNote();

	fixSlideHeight();
}

function fixSlideHeight(){
	$('.slide').height($('.content').height());
}
