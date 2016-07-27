const validateCommand = require('./content_delete.cmd.validator.js');
const createEvent = require('./content_deleted.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const log = require('../../log');

// Content delete just changes the isDeleted property to false
// AKA "soft" delete
function contentDeleteCommandHandler(payload) {
	log.info('RECEIVED CONTENT DELETE COMMAND 💃');
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

module.exports = contentDeleteCommandHandler;
