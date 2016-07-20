const validateCommand = require('./pillar_create.cmd.validator');
const createEvent = require('./pillar_created.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');
const uuid = require('node-uuid');
const log = require('../../log');

function pillarCreateCommandHandler(payload) {
	log.info('RECEIVED PILLAR CREATE COMMAND 💃');
	payload._id = uuid.v4();
	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			log.info('ERROR 😡', err);
			throw err;
		});
}

module.exports = pillarCreateCommandHandler;
