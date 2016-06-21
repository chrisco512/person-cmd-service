const validateCommand = require('./product_improve.cmd.validator');
const createEvent = require('./product_improved.event.creator');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');

function productImproveCommandHandler(payload) {
	console.log('Handling PRODUCT_IMPROVE command');

	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			console.log('Error: Need to handle errors better here ', err);
		});
}

module.exports = productImproveCommandHandler;