const {
	PERSON_CREATE
} = require('./command_types');

const personCreateCommandHandler = require('./person_create');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case PERSON_CREATE:
			return personCreateCommandHandler(payload);
	}
	//TODO: Handle case where command not found
}

module.exports = commandHandler;