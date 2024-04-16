'use strict';
var Order = require('../mongo/schemas').Order;
var SandwichService = require('../service/SandwichService');


/**
 * Add an order for an sandwich
 *
 * body Order place an order for a sandwich
 * returns Order
 **/
exports.addOrder = function (body) {
  return new Promise(async function (resolve, reject) {
    try {
      delete body.id; //In a case someone tries to manually put in ID

      // Check if all sandwich IDs exist and are valid
      for (let sandwich of body.sandwiches) {
        if (!/^[\da-fA-F]{24}$/.test(sandwich.id)) {
          return reject({ message: 'ID: ' + sandwich.id + ' does not exist or is not in a valid formation.', status: 400 });
        }

        let sandwichExists = await SandwichService.getSandwichById(sandwich.id);
        if (!sandwichExists) {
          return reject({
            message: 'Sandwich with ID ' + sandwich.id + ' does not exist',
            status: 400,
          });
        }
      }
      resolve(Order.create(body));
    } catch (err) {
      reject(err);
    }
  });
};


/**
 * Find an order by its ID
 * IDs must be string types
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function(orderId) {
  return new Promise(function(resolve, reject) {
    try{
      resolve(Order.findById(orderId).exec());
    } catch (err) {
      reject(err);
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
    try{
      resolve(Order.find());
    } catch (err) {
      reject(err);
    }
  });
}


/**
 * CORS preflight for /order
 *
 * no response value expected for this operation
 **/
exports.orderOPTIONS = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}