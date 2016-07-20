const { PERSON_FIRST_NAME_CHANGED } = require('../event_types');
const log = require('../../log');

function personFirstNameChanged({ _id, firstName }) {
	log.info(PERSON_FIRST_NAME_CHANGED, ' : ', { _id, firstName });

	return Promise.resolve({
		type: PERSON_FIRST_NAME_CHANGED,
		payload: {
			_id,
			firstName
		}
	});
}

module.exports = personFirstNameChanged;
