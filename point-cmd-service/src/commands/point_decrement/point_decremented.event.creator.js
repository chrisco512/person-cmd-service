const { POINT_DECREMENTED } = require('../event_types');
const log = require('../../log');

function pointCreated({ userId, count, date }) {
	log.debug(`${POINT_DECREMENTED}:${count}`);

	return {
		type: POINT_DECREMENTED,
		payload: {
			userId,
			count,
			date: date || new Date()
		}
	};
}

module.exports = pointCreated;
