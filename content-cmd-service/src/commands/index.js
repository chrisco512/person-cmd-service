const {
	CONTENT_CREATE,
	CONTENT_DELETE,
	CONTENT_TITLE_CHANGE,
	CONTENT_URL_CHANGE,
	CONTENT_QUOTE_CHANGE,
	CONTENT_DESCRIPTION_CHANGE,
	CONTENT_AUTHOR_CHANGE
} = require('./command_types');
const {
	INVALID_COMMAND
} = require('../error_types');

const contentCreateCommandHandler = require('./content_create');
const contentDeleteCommandHandler = require('./content_delete');
const contentTitleChangeCommandHandler = require('./content_title_change');
const contentUrlChangeCommandHandler = require('./content_url_change');
const contentQuoteChangeCommandHandler = require('./content_quote_change');
const contentAuthorChangeCommandHandler = require('./content_author_change');
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
		case CONTENT_URL_CHANGE:
			return contentUrlChangeCommandHandler(payload);
		case CONTENT_QUOTE_CHANGE:
			return contentQuoteChangeCommandHandler(payload);
		case CONTENT_AUTHOR_CHANGE:
			return contentAuthorChangeCommandHandler(payload);
		case CONTENT_DESCRIPTION_CHANGE:
			return contentDescriptionChangeCommandHandler(payload);
		default:
			throw { type: INVALID_COMMAND };
	}
}

module.exports = commandHandler;
