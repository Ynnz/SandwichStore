'use strict';

var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var schemas = require('./mongo/schemas');
var Item = schemas.Item;
var Order = schemas.Order;
var Topping = schemas.Topping;
var Sandwich = schemas.Sandwich;
const receiveTask = require('./rabbit-utils/receiveTask.js');

var oas3Tools = require('oas3-tools');
//TODO: Fetch serverPort from environment variables
var serverPort = 3001;
const MONGODB_NAME = process.env.MONGODB_NAME || 'mongodb'; // Use 'mongodb' as the default if not set

mongoose.connect(`mongodb://${MONGODB_NAME}:27017/group-yj-mongodb-1`);
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};
var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);

    receiveTask.getTask('rapid-runner-rabbit', 'handled-orders', (err, msg) => {
      if (err) {
        console.error(err);
        return;
      }
      receivedObject = JSON.parse(msg.content.toString());
      console.log('receivedObject ', receivedObject);
    });
});

