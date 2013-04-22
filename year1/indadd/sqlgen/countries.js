var fs = require('fs');

var countries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia-Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Faroe Islands', 'Finland', 'France', 'FYR Macedonia', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Israel', 'Italy', 'Kazakhstan', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Montenegro', 'Netherlands', 'Northern Ireland', 'Norway', 'Poland', 'Portugal', 'Republic of Ireland', 'Romania', 'Russia', 'San Marino', 'Scotland', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden	', 'Switzerland', 'Turkey', 'Ukraine', 'Wales'];

var output = [];

for(var i = 0; i < countries.length; i++){
  var sql = "INSERT INTO WorldCupSystem.Team VALUES ('"+i+"', '"+ countries[i] +"', '0');";
  output.push(sql);
}

fs.writeFileSync('../countries.sql', output.join('\n'), 'utf8');