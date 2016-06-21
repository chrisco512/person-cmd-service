const {
	PROPOSAL_CREATE
} = require('./command_types');

const proposalCreateCommandHandler = require('./proposal_create');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case PROPOSAL_CREATE:
			return proposalCreateCommandHandler(payload);
	}
}

module.exports = commandHandler;