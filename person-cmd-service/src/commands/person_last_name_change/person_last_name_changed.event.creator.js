const { PERSON_LAST_NAME_CHANGED } = require('../event_types');
const log = require('../../log');

function personLastNameChanged({ _id, lastName }) {
	log.info(PERSON_LAST_NAME_CHANGED, ' : ', { _id, lastName });

	return Promise.resolve({
		type: PERSON_LAST_NAME_CHANGED,
		payload: {
			_id,
			lastName
		}
	});
}

module.exports = personLastNameChanged;
