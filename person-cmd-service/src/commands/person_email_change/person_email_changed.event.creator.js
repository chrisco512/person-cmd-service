const { PERSON_EMAIL_CHANGED } = require('../event_types');
const log = require('../../log');

function personEmailChanged({ _id, email }) {
	log.info(PERSON_EMAIL_CHANGED, ' : ', { _id, email });

	return Promise.resolve({
		type: PERSON_EMAIL_CHANGED,
		payload: {
			_id,
			email
		}
	});
}

module.exports = personEmailChanged;
