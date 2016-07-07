const validateCommand = require('./pillar_delete.cmd.validator');
const createEvent = require('./pillar_deleted.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const uuid = require('node-uuid');
const log = require('../../log');

// Pillar delete just changes the isDeleted property to false
// AKA "soft" delete

function pillarDeleteCommandHandler(payload) {
	payload._id = uuid.v4();

	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			throw err;
		});
}

module.exports = pillarDeleteCommandHandler;
