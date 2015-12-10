var faker = require('faker'),
    vehicles = require('./vehicles'),
    regions = require('./regions'),
    years = require('./years'),
    fs = require('fs'),
    mysql = require('mysql'),
    db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'dwm1'
    });

var amountToSeed = 50;

db.connect();

console.log('Seeding database...');

var sql = '';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + +min);
}

function prepRegion(sql, callback) {

  for (var i = 0; i < regions.length; i++) {
    var region = regions[i];

    sql += `INSERT INTO LocationRegion (LocationRegionID, LocationRegionName) VALUES (${i}, '${region.name}');\n`;

    var cities = region.cities;

    for (var j = 0; j < cities.length; j++) {
      var city = cities[j];

      sql += `INSERT INTO LocalAuthority (LocalAuthorityID, LocalAuthorityName, LocalAuthorityAddress, LocalAuthorityPhone) VALUES (${j}, '${city.name} Council', '${city.council.address}', '${city.council.phone}');\n`;

      console.log('Seeding Station...');

      var address = faker.address.streetAddress();
      var phone = faker.phone.phoneNumber();
      var policeChief = `${faker.name.firstName()} ${faker.name.lastName()}`;

      sql += `INSERT INTO Station (StationID, StationAddress, StationPhone, StationPoliceChief) VALUES (${j}, "${address}", "${phone}", "${policeChief}");\n`;

      console.log('Station seeded!');

      sql += `INSERT INTO LocationCity (LocationCityID, LocationCityName, LocationRegionID) VALUES (${j}, '${city.name}', ${i});\n`;

    }

  }

  callback(sql);
}

function prepTime(sql, callback) {
  var mountCount = 0;
  var dayCount = 0;

  for (var i = 0; i < years.length; i++) {
    var year = years[i];

    sql += `INSERT INTO TimeYear (TimeYearID, TimeYear) VALUES (${i}, ${year.name});\n`;

    var months = year.months;
    for (var j = 0; j < months.length; j++) {
      var month = months[j];

      sql += `INSERT INTO TimeMonth (TimeMonthID, TimeMonth, TimeMonthName, TimeYearID) VALUES (${mountCount + j}, ${month.number}, "${month.name}", ${i});\n`;

      var days = month.days;
      for (var k = 0; k < days; k++) {
        var day = k + 1;

        sql += `INSERT INTO TimeDay (TimeDayID, TimeDay, TimeMonthID) VALUES (${dayCount + k}, ${day}, ${mountCount + j});\n`;
      }

      dayCount += days;

    }

    mountCount += months.length;

  }

  callback(sql);

}

function seed(sql, count, amount, callback) {

  var region = regions[0];
  var cityIndex = randomBetween(0, region.cities.length - 1);
  var city = region.cities[cityIndex];

  // -- Time

  console.log('Seeding Time...');

  var date = new Date(randomBetween(new Date('2014-01-01'), new Date('2015-12-11')));

  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDay();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var clockTime = `${hour}:${minute}:${second}`;

  var query = `
    SELECT TimeDayID As timeId
    FROM TimeDay, TimeMonth, TimeYear
    WHERE TimeDay.TimeMonthID = TimeMonth.TimeMonthID
      AND TimeMonth.TimeYearID = TimeYear.TimeYearID
      AND TimeDay = ${day + 1}
      AND TimeMonth = ${month + 1}
      AND TimeYear = ${year}`;

  db.query(query, function(err, rows, fields) {
    if (err) {
      console.log(err);
    }

    if (rows.length > 0) {

      var timeId = rows[0].timeId;
      sql += `INSERT INTO Time (TimeID, TimeClockTime, TimeDayID) VALUES (${count}, "${clockTime}", ${timeId});\n`;

      console.log('Time seeded!');

      // -- Owner

      console.log('Seeding Owner...');

      var name = `${faker.name.firstName()} ${faker.name.lastName()}`;
      var email = faker.internet.email();
      var phone = faker.phone.phoneNumber();

      sql += `INSERT INTO Owner (OwnerID, OwnerName, OwnerEmail, OwnerPhone) VALUES (${count}, "${name}", "${email}", "${phone}");\n`;

      console.log('Owner seeded!');

      // -- Location

      console.log('Seeding Location...');

      var address = faker.address.streetAddress();

      sql += `INSERT INTO Location (LocationID, LocationAddress, LocationCityID) VALUES (${count}, "${address}", ${cityIndex});\n`;

      console.log('Location seeded!');

      // -- Vehicle

      function genRandomEngineSize() {
        var minEngineSize = 1000;
        var maxEngineSize = 5000;
        return randomBetween(minEngineSize, maxEngineSize) + 'cc';
      }

      function genRandomColour() {

        var colours = vehicles.colours;

        var randomPercentage = randomBetween(colours[0].percentage, colours[colours.length - 1].percentage);

        for (var i = 0; i < colours.length; i++) {
          var colour = colours[i];
          if (randomPercentage < colour.percentage) {
            return colour.name;
          }
        }

        return colours[colours.length - 1].name;
      }

      function getNumberPlate(year) {
        // based on: https://en.wikipedia.org/wiki/Vehicle_registration_plates_of_the_United_Kingdom,_Crown_dependencies_and_overseas_territories#Local_memory_tags

        var numberPlate = '';

        // first char is for local area
        var firstChar = 'ABCDEFGHKLMNOPRSVWXY';
        numberPlate += firstChar.charAt(Math.floor(Math.random() * firstChar.length));

        // second char is from the dvla
        var secondChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        numberPlate += secondChar.charAt(Math.floor(Math.random() * secondChar.length));

        // get the last two chars of the manufactured year
        numberPlate += String(year).slice(-2);

        // add a space
        numberPlate += ' ';

        // three random chars to top it off. I and Q are removed as they can create offensive words
        var randomChars = 'ABCDEFGHJKLMNOPRSTUVWXYZ';
        for (var i = 0; i < 3; i++){
          numberPlate += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }

        return numberPlate;
      }

      console.log('Adding vehicles...');

      // generate some dates to use
      var manufacturedDate = new Date(randomBetween(new Date('1980-01-01'), new Date('2003-01-01')));
      var taxDate = new Date(randomBetween(new Date('2016-01-01'), new Date('2016-12-31')));
      var motDate = new Date(randomBetween(new Date('2016-01-01'), new Date('2016-12-31')));

      var vehicle = {
        numberPlate: getNumberPlate(manufacturedDate.getFullYear()),
        make: vehicles.makes[randomBetween(0, vehicles.makes.length - 1)],
        colour: genRandomColour(),
        engineSize: genRandomEngineSize(),
        fuelType: vehicles.fuelTypes[randomBetween(0, vehicles.fuelTypes.length - 1)],
        typeApproval: vehicles.typeApprovals[randomBetween(0, vehicles.typeApprovals.length -1)],
        yearOfManufacture: manufacturedDate.getFullYear(),
        dateRegistered: manufacturedDate.toISOString(),
        taxExpires: taxDate.toISOString(),
        motExpires: motDate.toISOString()
      }

      sql += `INSERT INTO Vehicle (VehicleID, VehicleMake, VehicleColour, VehicleEngineSize, VehicleFuelType, VehicleTypeApproval, VehicleYearOfManufacture, VehicleDateRegistered, VehicleTaxExpires, VehicleMoTExpires) VALUES ("${vehicle.numberPlate}", "${vehicle.make}", "${vehicle.colour}", "${vehicle.engineSize}", "${vehicle.fuelType}", "${vehicle.typeApproval}", "${vehicle.yearOfManufacture}", "${vehicle.dateRegistered}", "${vehicle.taxExpires}", "${vehicle.motExpires}");\n`;

      console.log('Vehicles added!');

      // -- SeizureNotice

      console.log('Seeding SeizureNotice...');

      sql += `INSERT INTO SeizureNotice (SeizureNoticeID, TimeID, LocalAuthorityID, StationID, LocationID, VehicleID, OwnerID) VALUES (${count}, ${count}, ${cityIndex}, ${cityIndex}, ${count}, "${vehicle.numberPlate}", ${count});\n`;

      console.log('SeizureNotice seeded!');

      count++;
      if (count === amount) {
        callback(sql);
      } else {
        seed(sql, count, amount, callback);
      }

    }
  });

}

console.log('Prepping time tables...');
prepTime(sql, function(sql){
  console.log('Prepped time tables!');

  console.log('Prepping location...');
  prepRegion(sql, function(sql){
    console.log('Prepped location!');

    seed(sql, 0, amountToSeed, function(sql){

      fs.writeFile('insert.sql', sql, function(err) {
        if(err) {
          return console.log(err);
        }

        console.log('The file was saved!');
        process.exit();

      });
    });
  });
});
