const { PILLAR_DELETED } = require('../event_types');
const log = require('../../log');

function pillarRemoved({ _id, tenantId, name, content, isSelected, isDeleted }) {
	log.info('INSIDE PILLAR REMOVED EVENT CREATING THING 🌸');
	// isSelected = false;
	// isDeleted = true;

	log.info(PILLAR_DELETED, ' : ', { _id, tenantId, name, content, isSelected, isDeleted });
	return Promise.resolve({
		type: PILLAR_DELETED,
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

module.exports = pillarRemoved;
