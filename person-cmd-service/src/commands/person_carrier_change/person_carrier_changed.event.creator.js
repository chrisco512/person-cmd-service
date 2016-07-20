const { PERSON_CARRIER_CHANGED } = require('../event_types');
const log = require('../../log');

function personCarrierChanged({ _id, carrier }) {
	log.info(PERSON_CARRIER_CHANGED, ' : ', { _id, carrier });

	return Promise.resolve({
		type: PERSON_CARRIER_CHANGED,
		payload: {
			_id,
			carrier
		}
	});
}

module.exports = personCarrierChanged;
