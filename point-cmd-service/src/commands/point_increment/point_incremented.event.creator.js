const { POINT_INCREMENTED } = require('../event_types');
const log = require('../../log');

function pointCreated({ userId, count }) {
	log.debug(`${POINT_INCREMENTED}:${count}`);

	return {
		type: POINT_INCREMENTED,
		payload: { userId, count }
	};
}

module.exports = pointCreated;
