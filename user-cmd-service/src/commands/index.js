const {
  USER_CREATE
} = require('./command_types');
const {
	SERVER_ERROR
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
			throw { type: SERVER_ERROR };
  }
}

module.exports = commandHandler;
