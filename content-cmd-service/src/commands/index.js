const {
	CONTENT_CREATE,
	CONTENT_DELETE,
	CONTENT_TITLE_CHANGE,
	CONTENT_DESCRIPTION_CHANGE
} = require('./command_types');
const {
	INVALID_COMMAND
} = require('../error_types');

const contentCreateCommandHandler = require('./content_create');
const contentDeleteCommandHandler = require('./content_delete');
const contentTitleChangeCommandHandler = require('./content_title_change');
const contentDescriptionChangeCommandHandler = require('./content_description_change');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case CONTENT_CREATE:
			return contentCreateCommandHandler(payload);
		case CONTENT_DELETE:
			return contentDeleteCommandHandler(payload);
		case CONTENT_TITLE_CHANGE:
			return contentTitleChangeCommandHandler(payload);
		case CONTENT_DESCRIPTION_CHANGE:
			return contentDescriptionChangeCommandHandler(payload);
		default:
			throw { type: INVALID_COMMAND };
	}
}

module.exports = commandHandler;
