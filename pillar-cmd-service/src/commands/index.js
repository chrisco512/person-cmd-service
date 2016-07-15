const {
	PILLAR_CREATE,
	PILLAR_DELETE,
	PILLAR_NAME_CHANGE
} = require('./command_types');

const {
	BAD_REQUEST
} =  require('../error_types');

const pillarCreateCommandHandler = require('./pillar_create');
const pillarDeleteCommandHandler = require('./pillar_delete');
const pillarNameChangeCommandHandler = require('./pillar_name_change');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case PILLAR_CREATE:
			return pillarCreateCommandHandler(payload);
		case PILLAR_DELETE:
			return pillarDeleteCommandHandler(payload);
		case PILLAR_NAME_CHANGE:
			return pillarNameChangeCommandHandler(payload);
		default:
			throw { type: BAD_REQUEST, error: 'Command Not Found' }
	}
}

module.exports = commandHandler;
