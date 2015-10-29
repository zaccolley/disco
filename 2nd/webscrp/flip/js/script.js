(function(){

	var p = document.getElementById('flipped');

	var inputBox = document.getElementById('input-str');

	flip = function(){

		ajax({ url: 'flip.php?str='+inputBox.value, dataType: 'txt' }, function(data){
			p.innerHTML = data;
		});

	}

	inputBox.addEventListener("keydown", flip);
	inputBox.addEventListener("keyup", flip);

})()