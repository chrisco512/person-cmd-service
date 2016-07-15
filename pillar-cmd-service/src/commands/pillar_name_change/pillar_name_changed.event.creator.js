const { PILLAR_NAME_CHANGED } = require('../event_types');
const log = require('../../log');

function pillarNameChanged({ _id, tenantId, name, content, isSelected, isDeleted }) {
	log.info(PILLAR_NAME_CHANGED, ' : ', { _id, tenantId, name, content, isSelected, isDeleted });
	return Promise.resolve({
		type: PILLAR_NAME_CHANGED,
		payload: {
			_id,
			tenantId,
			name,
			content,
			isSelected,
			isDeleted
		}
	});
}

module.exports = pillarNameChanged;
