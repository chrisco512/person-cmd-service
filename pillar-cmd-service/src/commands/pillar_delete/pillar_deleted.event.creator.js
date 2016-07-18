const { PILLAR_DELETED } = require('../event_types');
const log = require('../../log');

function pillarRemoved({ _id, tenantId, name, content, isDeleted }) {

	isDeleted = true;

	log.info(PILLAR_DELETED, ' : ', { _id, tenantId, name, content, isDeleted });
	return Promise.resolve({
		type: PILLAR_DELETED,
		payload: {
			_id,
			tenantId,
			name,
			content,
			isDeleted
		}
	});
}

module.exports = pillarRemoved;
