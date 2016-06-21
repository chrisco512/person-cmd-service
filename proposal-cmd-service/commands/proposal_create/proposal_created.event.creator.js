const { PROPOSAL_CREATED } = require('../event_types');

function proposalCreated({ _id, name }) {
	console.log('EVENT CREATOR:', { _id, name });

	return Promise.resolve({
		type: PROPOSAL_CREATED,
		payload: { _id, name }
	});
}

module.exports = proposalCreated;