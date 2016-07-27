const validateCommand = require('./person_create.cmd.validator');
const createEvent = require('./person_created.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const uuid = require('node-uuid');
const log = require('../../log');

function personCreateCommandHandler(payload) {
	payload._id = uuid.v4();

	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			log.error('💥', err);
			throw err;
		});
}

module.exports = personCreateCommandHandler;
