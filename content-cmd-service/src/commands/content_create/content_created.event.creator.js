const { CONTENT_CREATED } = require('../event_types');
const log = require('../../log');

function contentCreated({ _id, pillarId, type, data }) {
	log.info(CONTENT_CREATED, ' : ', { _id, pillarId, type, data });

	return Promise.resolve({
		type: CONTENT_CREATED,
		payload: {
			_id,
			pillarId,
			type,
			data
		}
	});
}

module.exports = contentCreated;
