const { CONTENT_DELETED } = require('../event_types');
const log = require('../../log');

function contentRemoved({ _id, first_name, last_name, phone, carrier }) {
	log.info(CONTENT_DELETED, ' : ', { _id, first_name, last_name, phone, carrier });

	return Promise.resolve({
		type: CONTENT_DELETED,
		payload: {
			// _id,
			// first_name,
			// last_name,
			// phone,
			// carrier,
		}
	});
}

module.exports = contentRemoved;
