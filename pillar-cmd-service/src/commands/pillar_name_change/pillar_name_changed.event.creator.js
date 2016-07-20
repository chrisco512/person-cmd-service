const { PILLAR_NAME_CHANGED } = require('../event_types');
const log = require('../../log');

function pillarNameChanged({ pillarName, index }) {
	log.info(PILLAR_NAME_CHANGED, ' : ', { pillarName, index });
	return Promise.resolve({
		type: PILLAR_NAME_CHANGED,
		payload: {
			pillarName,
			index
		}
	});
}

module.exports = pillarNameChanged;
