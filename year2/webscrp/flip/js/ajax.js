// ajax: jackie chan hax

/*

	inputOptions

		theres some options you can input

		{
			request: GET, POST, HEAD etc..
			url: the URL to request (required)
			async: is it asynchronous?
			dataType: what type is the data sent back
			data: any data to be sent
			callbacks: functions to callback (load, progress)
			debug: shows console.logs
		}

		see below for defaults set

	callback

		the function to callback on

*/

var ajax = function(inputOptions, callback){

	var xhr,
	options = {
		// defaults
		request: 'GET',
		url: null,
		async: 'true',
		dataType: 'json',
		data: null,
		debug: false
	}


	// sort through input object

	for(var option in inputOptions){
		var optionValue = inputOptions[option];
	
		switch(option){
			case 'request': options.request = optionValue; break;
			case 'url': options.url = optionValue; break;
			case 'async': options.async = optionValue; break;
			case 'dataType': options.dataType = optionValue; break;
			case 'data': options.data = optionValue; break;
			default: options.debug && console.log('Invalid option supplied');
		}

	}

	if(!options.url){
		options.debug && console.log('ajax() requires a URL');
		return false;
	}

	if(window.XMLHttpRequest){ // Mozilla, Safari, ...
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject){ // IE
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}

	if(!xhr){
		options.debug && console.log('XMLHttpRequest could not be created. :¬(');
		return false;
	}else{

		options.debug && console.log('XMLHttpRequest created');

		xhr.open(options.request, options.url, options.async);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.responseType = options.dataType;
		xhr.send(options.data);

		xhr.addEventListener("readystatechange", function(){

			var states = ['Uninitialised', 'Loading',
						'Loaded', 'Interactive', 'Complete'];

			options.debug && console.log('State:', states[xhr.readyState], xhr.readyState);

			// OK and ready
			if(xhr.readyState == 4){
				options.debug && console.log('Status:', xhr.status, '('+xhr.statusText+')', 'at "'+options.url+'"');     
				if(xhr.status == 200){
					options.debug && console.log('Success');
					callback(xhr.response);
				}
			}

		});

	}

};
