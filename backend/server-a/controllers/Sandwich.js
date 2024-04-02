'use strict';

var utils = require('../utils/writer.js');
var Sandwich = require('../service/SandwichService');

module.exports.getSandwichById = function getSandwichById (req, res, next, sandwichId) {
  Sandwich.getSandwichById(sandwichId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSandwiches = function getSandwiches (req, res, next) {
  Sandwich.getSandwiches()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
