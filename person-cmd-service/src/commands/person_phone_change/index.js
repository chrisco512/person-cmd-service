const validateCommand = require('./person_phone_change.cmd.validator');
const createEvent = require('./person_phone_changed.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const uuid = require('node-uuid');
const log = require('../../log');

function personPhoneChangeCommandHandler(payload) {

	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			throw err;
		});
}

module.exports = personPhoneChangeCommandHandler;
