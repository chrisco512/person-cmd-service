const _ = require('lodash');
const {
	PROPOSAL_CREATED
} = require('../../commands/event_types');

function reducer(proposals = [], action ) {
	console.log('reducing proposals');
	switch(action.type) {
		case PROPOSAL_CREATED:
			return proposalCreated(proposals, action.payload);
	}
	return proposals;
}

function proposalCreated(proposals, { _id }) {
	console.log('adding new proposal : ', { _id });
	return [...proposals, { _id }];
}

module.exports = reducer;