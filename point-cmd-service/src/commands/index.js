const {
	POINT_INCREMENT,
	POINT_DECREMENT
} = require('./command_types');
const {
	INVALID_COMMAND
} = require('../error_types');

const pointIncrementCommandHandler = require('./point_increment');
const pointDecrementCommandHandler = require('./point_decrement');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case POINT_INCREMENT:
			return pointDecrementCommandHandler(payload);
		case 	POINT_DECREMENT:
			return pointIncrementCommandHandler(payload);
		default:
			throw { type: INVALID_COMMAND };
	}
}

module.exports = commandHandler;
