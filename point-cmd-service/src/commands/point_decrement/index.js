const validateCommand = require('./point_decrement.cmd.validator');
const createEvent = require('./point_decrement.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const log = require('../../log');

function pointDecrementCommandHandler(payload) {
	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			log.error('💥 ', err);
			throw err;
		});
}

module.exports = pointDecrementCommandHandler;
