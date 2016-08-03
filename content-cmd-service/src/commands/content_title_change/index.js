const validateCommand = require('./content_title_change.cmd.validator.js');
const createEvent = require('./content_title_change.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const log = require('../../log');

function contentTitleChangeCommandHandler(payload) {
	log.info('RECEIVED CONTENT TITLE CHANGE COMMAND 💃');
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

module.exports = contentTitleChangeCommandHandler;
