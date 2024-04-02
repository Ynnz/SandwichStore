'use strict';


/**
 * Find sandwich by ID
 * Returns a single sandwich information
 *
 * sandwichId Long ID of sandwich to return
 * returns Sandwich
 **/
exports.getSandwichById = function(sandwichId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "my-super-sandwich",
  "toppings" : [ {
    "name" : "name",
    "id" : 6
  }, {
    "name" : "name",
    "id" : 6
  } ],
  "id" : 0,
  "breadType" : "oat"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
    var examples = {};
    examples['application/json'] = [ {
  "name" : "my-super-sandwich",
  "toppings" : [ {
    "name" : "name",
    "id" : 6
  }, {
    "name" : "name",
    "id" : 6
  } ],
  "id" : 0,
  "breadType" : "oat"
}, {
  "name" : "my-super-sandwich",
  "toppings" : [ {
    "name" : "name",
    "id" : 6
  }, {
    "name" : "name",
    "id" : 6
  } ],
  "id" : 0,
  "breadType" : "oat"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

