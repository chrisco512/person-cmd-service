const _ = require('lodash');
const {
	PROPOSAL_CREATED
	} = require('../../event_types');

function reducer(proposals = [], action ) {
	switch(action.type) {
		case PROPOSAL_CREATED:
			return proposalCreated(proposals, action);
	}
	return proposals;
}

function proposalCreated(proposals, action) {
	return [...proposals, action.payload];
}

module.exports = reducer;