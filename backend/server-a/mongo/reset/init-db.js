'use strict';

var mongoose = require('mongoose');
var Sandwich = require('../schemas').Sandwich;
const fs = require('fs');
var path = require('path');

const MONGODB_NAME = process.env.MONGODB_NAME || 'mongodb'; // Use 'mongodb' as the default if not set

mongoose.connect(`mongodb://${MONGODB_NAME}:27017/group-yj-mongodb-1`);
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

async function main(){
  const sandwiches = await Sandwich.find();

  if (sandwiches.length > 0) {
    console.log('Sandwiches already exist in the database. Exiting...');
    process.exit(0);
  }

  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './sandwiches.json'), 'utf8')
  );
  for (const sandwich of data) {
    await Sandwich.create(sandwich);
  }
  console.log('Successfully populated sandwiches.');
  process.exit(0);
}

main().catch(err =>{
  console.error('Error populating sandwiches:', err);
  process.exit(1);
})