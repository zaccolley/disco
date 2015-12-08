var faker = require('faker'),
    mysql = require('mysql'),
    vehicles = require('../vehicles');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database : 'dwm'
});

function getRandomVehicle(){
  return {
    colour: vehicles.colours[Math.floor(Math.random() * vehicles.colours.length)].name,
    make:   vehicles.makes[Math.floor(Math.random() * vehicles.makes.length)]
  }
}

var vehicle = getRandomVehicle();
var name = faker.name.findName();

console.log(vehicle);
console.log(name);

// VehicleID 'CP03 OEF'
// VehicleMake 'RENAULT'
// VehicleColour 'RED'
// VehicleEngineSize '1390cc'
// VehicleFuelType 'PETROL'
// VehicleStatus 'Tax not due'
// VehicleTypeApproval 'M1'
// VehicleYearOfManufacture 2003
// VehicleDateRegistered 04 July 2003
// VehicleTaxExpires 01 December 2016
// VehicleMoTExpires 07 July 2016

connection.connect();

connection.query('SELECT * from DVLA', function(err, rows, fields) {
  if (err) {
    throw err;
  }

  console.log(rows);
});

connection.end();
