const {
  USER_CREATE
} = require('./command_types');
const {
	INVALID_COMMAND
} = require('../error_types');

const userCreateCommandHandler = require('./user_create');

function commandHandler(command) {
  const {
    payload
  } = command;

  switch (command.type) {
    case USER_CREATE:
      return userCreateCommandHandler(payload);
		default:
			throw { type: INVALID_COMMAND };
  }
}

module.exports = commandHandler;
