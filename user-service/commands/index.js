const {
	USER_CREATE
} = require('./command_types');

const userCreateCommandHandler = require('./user_create');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case USER_CREATE:
			return userCreateCommandHandler(payload);
	}
}

module.exports = commandHandler;
