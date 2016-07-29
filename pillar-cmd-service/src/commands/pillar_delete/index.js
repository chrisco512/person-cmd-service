const validateCommand = require('./pillar_delete.cmd.validator');
const createEvent = require('./pillar_deleted.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const log = require('../../log');

// Pillar delete just changes the isDeleted property to false
// AKA "soft" delete
function pillarDeleteCommandHandler(payload) {
	log.info('RECEIVED PILLAR DELETE COMMAND 💃');
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

module.exports = pillarDeleteCommandHandler;
