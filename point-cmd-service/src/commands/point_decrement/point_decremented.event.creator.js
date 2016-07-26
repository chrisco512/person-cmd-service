const { POINT_DECREMENTED } = require('../event_types');
const log = require('../../log');

function pointCreated({ userId, count }) {
	log.debug(`${POINT_DECREMENTED}:${count}`);

	return {
		type: POINT_DECREMENTED,
		payload: { userId, count }
	};
}

module.exports = pointCreated;
