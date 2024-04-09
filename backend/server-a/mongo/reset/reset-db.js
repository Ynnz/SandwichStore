'use strict';

var mongoose = require('mongoose');
var Sandwich = require('../schemas').Sandwich;
var fs = require('fs');
var path = require('path');

const MONGODB_NAME = process.env.MONGODB_NAME || 'mongodb'; // Use 'mongodb' as the default if not set

mongoose.connect(`mongodb://${MONGODB_NAME}:27017/group-yj-mongodb-1`);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

console.log('Populating sandwiches...');

/*fs.readFile(
  path.join(__dirname, 'sandwiches.json'),
  'utf8',
  function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var sandwiches = JSON.parse(data);
    console.log('Sandwiches: ', sandwiches);

    for (const data of sandwiches) {
      const sandwichToAdd = new Sandwich(data);
      console.log('Sandwich to add: ', sandwichToAdd);
      sandwichToAdd.save();
    }
    console.log('Successfully populated sandwiches.');
    });
*/

(async () => {
  console.log('Get all sandwiches...');
  // Fetch all Sandwiches and print them out
  const printAllSandwiches = async () => {
    await Sandwich.deleteMany({});
    await Sandwich.create({
      name: 'Egg and Chicken Sandwich',
      toppings: [],
      breadType: 'white bread',
    });
    await Sandwich.create({
      name: 'Ham Sandwich',
      toppings: [],
      breadType: 'flour tortilla',
    });
    await Sandwich.create({
      name: 'Cheese Sandwich',
      toppings: [],
      breadType: 'French baguette',
    });
    try {
      const sandwiches = await Sandwich.find();
      console.log('All Sandwiches:', sandwiches);
    } catch (error) {
      console.error('Error fetching sandwiches:', error);
    }
  };

  await printAllSandwiches();

  process.exit(0);
})();