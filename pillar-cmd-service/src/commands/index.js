const {
	PILLAR_CREATE,
	PILLAR_DELETE
} = require('./command_types');

const pillarCreateCommandHandler = require('./pillar_create');
const pillarDeleteCommandHandler = require('./pillar_delete');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case PILLAR_CREATE:
			return pillarCreateCommandHandler(payload);
		case PILLAR_DELETE:
			return pillarDeleteCommandHandler(payload);
	}
}

module.exports = commandHandler;
