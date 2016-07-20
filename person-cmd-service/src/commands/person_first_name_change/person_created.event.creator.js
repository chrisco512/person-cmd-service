const { PERSON_CREATED } = require('../event_types');
const log = require('../../log');

function personCreated({ _id, first_name, last_name, phone, carrier }) {
	log.info(PERSON_CREATED, ' : ', { _id, first_name, last_name, phone, carrier });

	return Promise.resolve({
		type: PERSON_CREATED,
		payload: {
			_id,
			first_name,
			last_name,
			phone,
			carrier,
		}
	});
}

module.exports = personCreated;
