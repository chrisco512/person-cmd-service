const validateCommand = require('./content_url_change.cmd.validator.js');
const createEvent = require('./content_url_change.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const log = require('../../log');

function contentUrlChangeCommandHandler(payload) {
	log.info('RECEIVED CONTENT URL CHANGE COMMAND 💃');
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

module.exports = contentUrlChangeCommandHandler;
