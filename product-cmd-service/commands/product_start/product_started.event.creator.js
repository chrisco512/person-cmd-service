const { PRODUCT_STARTED } = require('../event_types');

function productStarted({ _id, proposal_id }) {
	console.log('EVENT CREATOR:', { _id, proposal_id });

	return {
		type: PRODUCT_STARTED,
		payload: {
			_id,
			proposal_id,
			status: 'started',
			improvements: 0,
		}
	};
}

module.exports = productStarted;