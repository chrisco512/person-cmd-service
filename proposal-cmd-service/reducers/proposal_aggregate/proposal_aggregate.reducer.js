const _ = require('lodash');
const {
	PROPOSAL_CREATED
} = require('../../commands/event_types');

function reducer(proposals = [], action ) {
	console.log("In proposal reducer - ", action);
	switch(action.type) {
		case PROPOSAL_CREATED:
			return proposalCreated(proposals, action.payload);
	}
	return proposals;
}

function proposalCreated(proposals, payload) {
	console.log("Making proposal with action - ", PROPOSAL_CREATED);
	return [...proposals, payload];
}

module.exports = reducer;
