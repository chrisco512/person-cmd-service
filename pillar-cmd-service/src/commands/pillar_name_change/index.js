const validateCommand = require('./pillar_name_change.cmd.validator');
const createEvent = require('./pillar_name_changed.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const log = require('../../log');

function pillarNameChangeCommandHandler(payload) {
	log.info('RECEIVED PILLAR NAME CHANGE COMMAND 💃', payload);
	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			throw err;
		});
}

module.exports = pillarNameChangeCommandHandler;
