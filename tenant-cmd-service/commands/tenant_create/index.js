const validateCommand = require('./tenant_create.cmd.validator.js');
const createEvent = require('./tenant_created.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');

function tenantCreateCommandHandler(payload) {
	console.log('Handling TENANT_CREATE command');

	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			console.log('Error: Need to handle errors better here ', err);
		});
}

module.exports = tenantCreateCommandHandler;
