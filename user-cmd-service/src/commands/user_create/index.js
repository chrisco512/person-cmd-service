const validateCommand = require('./user_create.cmd.validator');
const createEvent = require('./user_created.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');

function userCreateCommandHandler(payload) {
  return validateCommand(payload)
    .then(createEvent)
    .then(dispatchEvent)
    .then(persistEvent)
    .then(publishEvent)
    .catch(function(err) {
      throw err;
    });
}

module.exports = userCreateCommandHandler;
