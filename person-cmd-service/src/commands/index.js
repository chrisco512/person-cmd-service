const {
	PERSON_CREATE
} = require('./command_types');
const {
	INVALID_COMMAND
} = require('../error_types');

const personCreateCommandHandler = require('./person_create');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case PERSON_CREATE:
			return personCreateCommandHandler(payload);
		default:
			throw { type: INVALID_COMMAND };
	}
	//TODO: Handle case where command not found
}

module.exports = commandHandler;
