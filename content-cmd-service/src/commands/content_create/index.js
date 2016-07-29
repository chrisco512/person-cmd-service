const validateCommand = require('./content_create.cmd.validator.js');
const createEvent = require('./content_created.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const uuid = require('node-uuid');
const log = require('../../log');

function contentCreateCommandHandler(payload) {
	log.info('RECEIVED CONTENT CREATE COMMAND 💃');
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

module.exports = contentCreateCommandHandler;
