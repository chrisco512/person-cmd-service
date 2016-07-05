const {
	CONTENT_CREATE,
	CONTENT_DELETE
} = require('./command_types');

const contentCreateCommandHandler = require('./content_create');
const contentDeleteCommandHandler = require('./content_delete');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case CONTENT_CREATE:
			return contentCreateCommandHandler(payload);
		case CONTENT_DELETE:
			return contentDeleteCommandHandler(payload);
	}
}

module.exports = commandHandler;
