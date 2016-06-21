const {
	PRODUCT_COMPLETE,
	PRODUCT_IMPROVE,
	PRODUCT_START
} = require('./command_types');

const productCompleteCommandHandler = require('./product_complete');
const productImproveCommandHandler = require('./product_improve');
const productStartCommandHandler = require('./product_start');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case PRODUCT_COMPLETE:
			return productCompleteCommandHandler(payload);
		case PRODUCT_IMPROVE:
			return productImproveCommandHandler(payload);
		case PRODUCT_START:
			return productStartCommandHandler(payload);
		default:
			return Promise.reject(`Invalid command type - ${command.type}`);
	}
}

module.exports = commandHandler;