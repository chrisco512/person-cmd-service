
const validateCommand = require('./add_manager.cmd.validator');
const createEvent = require('./add_manager.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');

function managerAddCommandHandler(payload) {
	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
                  console.log(err)
			throw err;
		});
}

module.exports = managerAddCommandHandler;
