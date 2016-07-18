const { PILLAR_CREATED } = require('../event_types');
const log = require('../../log');

function pillarCreated({ _id, tenantId, name, content, isDeleted }) {

	isDeleted = false;

	log.info(PILLAR_CREATED, ' : ', { _id, tenantId, name, content, isDeleted });
	return Promise.resolve({
		type: PILLAR_CREATED,
		payload: {
			_id,
			tenantId,
			name,
			content,
			isDeleted
		}
	});
}

module.exports = pillarCreated;
