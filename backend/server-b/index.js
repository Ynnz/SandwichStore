'use strict';

const sendTask = require('./rabbit-utils/sendTask.js');
const receiveTask = require('./rabbit-utils/receiveTask.js');

//TODO: Catch the task once it's complete (after the 10 second delay).
//TODO: Use sendTask to send the updated task to the 'completed-orders' queue.
//TODO: Remember to change the "status" of the task to "ready"
function main() {
  receiveTask.getTask('rapid-runner-rabbit', 'received-orders', (err, msg) => {
    if (err) {
      console.error(err);
      return;
    }
    var objectToReturn = JSON.parse(msg.content.toString());
    objectToReturn.status = 'ready';
    console.log('objectToReturn ', objectToReturn);
    sendTask.addTask('rapid-runner-rabbit', 'handled-orders', objectToReturn);
  });
}
main();
