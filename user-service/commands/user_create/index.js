const validateCommand = require('./user_create.cmd.validator.js');
const createEvent = require('./user_created.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');

function userCreateCommandHandler(payload) {
	console.log('Handling USER_CREATE command');

	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			console.log('Error: Need to handle errors better here ', err);
			throw err;
		});
}

module.exports = userCreateCommandHandler;
