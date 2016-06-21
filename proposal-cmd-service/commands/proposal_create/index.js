const validateCommand = require('./proposal_create.cmd.validator.js');
const createEvent = require('./proposal_created.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');

function proposalCreateCommandHandler(payload) {
	console.log('Handling PROPOSAL_CREATE command');

	validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			console.log('Error: Need to handle errors better here ', err);
		});
}

module.exports = proposalCreateCommandHandler;