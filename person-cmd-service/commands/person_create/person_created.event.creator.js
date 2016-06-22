const { PERSON_CREATED } = require('../event_types');

function proposalCreated({ _id, first_name, last_name, phone, carrier }) {
	console.log('EVENT CREATOR:', { _id, first_name, last_name, phone, carrier });

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

module.exports = proposalCreated;