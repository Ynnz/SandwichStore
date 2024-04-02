'use strict';


/**
 * Add an order for an sandwich
 *
 * body Order place an order for a sandwich
 * returns Order
 **/
exports.addOrder = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "sandwitches" : [ {
    "quantity" : 1,
    "id" : 6
  }, {
    "quantity" : 1,
    "id" : 6
  } ],
  "id" : 0,
  "status" : "ordered"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function(orderId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "sandwitches" : [ {
    "quantity" : 1,
    "id" : 6
  }, {
    "quantity" : 1,
    "id" : 6
  } ],
  "id" : 0,
  "status" : "ordered"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "sandwitches" : [ {
    "quantity" : 1,
    "id" : 6
  }, {
    "quantity" : 1,
    "id" : 6
  } ],
  "id" : 0,
  "status" : "ordered"
}, {
  "sandwitches" : [ {
    "quantity" : 1,
    "id" : 6
  }, {
    "quantity" : 1,
    "id" : 6
  } ],
  "id" : 0,
  "status" : "ordered"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

