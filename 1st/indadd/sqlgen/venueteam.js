var fs = require('fs');

var output = [];

for(var i = 12; i < 16; i++){
	for(var j = 0; j < 53; j++){
  		var sql = "INSERT INTO WorldCupSystem.VenueTeam VALUES ('"+i+"', '"+ j +"');";
  		output.push(sql);
	}
}

fs.writeFileSync('../venueteam.sql', output.join('\n'), 'utf8');