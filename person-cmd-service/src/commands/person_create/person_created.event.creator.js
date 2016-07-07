const { PERSON_CREATED } = require('../event_types');
const log = require('../../log');

function personCreated({ _id, firstName, lastName, phone, carrier, email }) {
	log.info(PERSON_CREATED, ' : ', { _id, firstName, lastName, phone, carrier, email });

	return Promise.resolve({
		type: PERSON_CREATED,
		payload: {
			_id,
			firstName,
			lastName,
			phone,
			carrier,
			email
		}
	});
}

module.exports = personCreated;
