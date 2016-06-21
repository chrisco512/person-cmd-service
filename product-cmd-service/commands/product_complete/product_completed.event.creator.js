const { PRODUCT_COMPLETED } = require('../event_types');

function productCompleted({ _id }) {
	console.log('EVENT CREATOR:', _id );

	return {
		type: PRODUCT_COMPLETED,
		payload: { _id }
	};
}

module.exports = productCompleted;