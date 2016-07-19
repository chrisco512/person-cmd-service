const { PERSON_PHONE_CHANGED } = require('../event_types');
const log = require('../../log');

function personPhoneChanged({ _id, phone }) {
	log.info(PERSON_PHONE_CHANGED, ' : ', { _id, phone });

	return Promise.resolve({
		type: PERSON_PHONE_CHANGED,
		payload: {
			_id,
			phone
		}
	});
}

module.exports = personPhoneChanged;
