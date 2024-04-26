#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

var amqp = require('amqplib');

module.exports.getTask = function(rabbitHost, queueName, callback){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        console.log(" [x] Received '%s'", body);
        callback(null, msg);
        ch.ack(msg);
      }
    });
  }).catch(console.warn);
}
