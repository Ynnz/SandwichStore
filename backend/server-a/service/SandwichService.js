'use strict';
var Sandwich = require('../mongo/schemas').Sandwich;


/**
 * Find sandwich by ID
 * Returns a single sandwich information
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
exports.getSandwichById = function(sandwichId) {
  return new Promise(function(resolve, reject) {
    try{
      resolve(Sandwich.findById(sandwichId).exec());
    } catch (err) {
      reject(err);
    }
  });
}


/**
 * Get a list of all sandwiches. Empty array if no sandwiches are found.
 *
 * returns ArrayOfSandwiches
 **/
exports.getSandwiches = function() {
  return new Promise(function(resolve, reject) {
    try{
      resolve(Sandwich.find());
    } catch (err) {
      reject(err);
    }
  });
}

