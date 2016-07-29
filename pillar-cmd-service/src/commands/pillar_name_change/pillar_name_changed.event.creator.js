const { PILLAR_NAME_CHANGED } = require('../event_types');
const log = require('../../log');

function pillarNameChanged({ name, index }) {
	log.info(PILLAR_NAME_CHANGED, ' : ', { name, index });
	return Promise.resolve({
		type: PILLAR_NAME_CHANGED,
		payload: {
			name,
			index
		}
	});
}

module.exports = pillarNameChanged;
