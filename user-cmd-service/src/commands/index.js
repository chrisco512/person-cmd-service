const {
	USER_CREATE,
        ADD_MANAGER
} = require('./command_types');

const userCreateCommandHandler = require('./user_create');
const addManagerCommandHandler = require('./add_manager');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case USER_CREATE:
			return userCreateCommandHandler(payload);
                case ADD_MANAGER:
                        return addManagerCommandHandler(payload);
	}
}

module.exports = commandHandler;
