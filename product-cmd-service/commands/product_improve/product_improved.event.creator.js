const { PRODUCT_IMPROVED } = require('../event_types');

function productImproved(commandPayload) {
	console.log('EVENT CREATOR:', commandPayload);
	const { _id } = commandPayload;

	return {
		type: PRODUCT_IMPROVED,
		payload: { _id }
	};
}

module.exports = productImproved;