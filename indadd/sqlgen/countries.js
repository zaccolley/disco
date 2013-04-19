var fs = require('fs');

var countries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia-Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Faroe Islands', 'Finland', 'France', 'FYR Macedonia', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Israel', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'Northern Ireland', 'Norway', 'Poland', 'Portugal', 'Republic of Ireland', 'Romania', 'Russi'];

var output = [];

for(var i = 0; i < countries.length; i++){
  var sql = "INSERT INTO WorldCupSystem.Team (Team_ID, Team_Name, Team_Qualified) VALUES ('"+i+"', '"+ countries[i] +"', '0');";
  output.push(sql);
}

fs.writeFileSync('../countries.sql', output.join('\n'), 'utf8');
