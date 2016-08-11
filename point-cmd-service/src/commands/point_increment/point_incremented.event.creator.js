const { POINT_INCREMENTED } = require('../event_types');
const log = require('../../log');

function pointCreated({ userId, count, date }) {
	log.debug(`${POINT_INCREMENTED}:${count}`);

	return {
		type: POINT_INCREMENTED,
		payload: {
			userId,
			count,
			date: date || new Date()
		}
	};
}

module.exports = pointCreated;
