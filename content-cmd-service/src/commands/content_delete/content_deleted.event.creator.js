const { CONTENT_DELETED } = require('../event_types');
const log = require('../../log');

function contentRemoved({ _id, pillarId, type, data, isDeleted }) {
	log.info(CONTENT_DELETED, ' : ', { _id, pillarId, type, data, isDeleted });
	return Promise.resolve({
		type: CONTENT_DELETED,
		payload: {
			_id,
			pillarId,
			type,
			data,
			isDeleted
		}
	});
}

module.exports = contentRemoved;
