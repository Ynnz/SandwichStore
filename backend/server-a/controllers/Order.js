'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');
var sendTask = require('../rabbit-utils/sendTask.js');
var receiveTask = require('../rabbit-utils/receiveTask.js');

module.exports.addOrder = function addOrder (req, res, next, body) {
  Order.addOrder(body)
  .then(function (response) {
    utils.writeJson(res, response);
    sendTask.addTask('rapid-runner-rabbit', 'received-orders', response);
  })
  .catch(function (response) {
    utils.writeJson(res, response);
  });
};

module.exports.getOrderById = function getOrderById (req, res, next, orderId) {
  Order.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrders = function getOrders (req, res, next) {
  Order.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.orderOPTIONS = function orderOPTIONS(req, res, next) {
  Order.orderOPTIONS()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
