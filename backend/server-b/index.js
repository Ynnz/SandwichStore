'use strict';

const sendTask = require('./rabbit-utils/sendTask.js');
const receiveTask = require('./rabbit-utils/receiveTask.js');

function main() {
  receiveTask.getTask('rapid-runner-rabbit', 'received-orders', (err, msg) => {
    if (err) {
      console.error(err);
      return;
    }
    var objectToReturn = JSON.parse(msg.content.toString());
    objectToReturn.status = 'ready';
    sendTask.addTask('rapid-runner-rabbit', 'handled-orders', objectToReturn);
  });
}
main();
