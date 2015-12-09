var faker = require('faker'),
    mysql = require('mysql'),
    vehicles = require('./vehicles');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database : 'dwm1'
});

console.log('Seeding database...');

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + +min);
}

// -- Vehicle seeding

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

function getRandomVehicle() {

  // generate some dates to use
  var manufacturedDate = new Date(randomBetween(new Date('1980-01-01'), new Date('2003-01-01')));
  var taxDate = new Date(randomBetween(new Date('2016-01-01'), new Date('2016-12-31')));
  var motDate = new Date(randomBetween(new Date('2016-01-01'), new Date('2016-12-31')));

  return {
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
}

connection.connect();

// var name = faker.name.findName();

console.log('Adding vehicles...');

var vehicleAmountToGenerate = 100;

for (var i = 0; i < vehicleAmountToGenerate; i++) {
  var vehicle = getRandomVehicle();

  var sql = `
    INSERT INTO Vehicle (
      VehicleID, VehicleMake, VehicleColour, VehicleEngineSize,
      VehicleFuelType, VehicleTypeApproval, VehicleYearOfManufacture,
      VehicleDateRegistered, VehicleTaxExpires, VehicleMoTExpires
    ) VALUES (
      '${vehicle.numberPlate}', '${vehicle.make}', '${vehicle.colour}', '${vehicle.engineSize}',
      '${vehicle.fuelType}', '${vehicle.typeApproval}', '${vehicle.yearOfManufacture}',
      '${vehicle.dateRegistered}', '${vehicle.taxExpires}', '${vehicle.motExpires}'
    )
  `;

  connection.query(sql, function(err, rows, fields) {
    if (err) {
      throw err;
    }
  });

}

console.log('Vehicles added!');

console.log('Database seeded!');
process.exit();
