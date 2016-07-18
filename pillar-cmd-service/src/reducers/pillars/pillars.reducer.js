const log = require('../../log');
const _ = require('lodash');
const {
	PILLAR_CREATED,
	PILLAR_DELETED,
	PILLAR_NAME_CHANGED
} = require('../../commands/event_types');

function reducer(pillars = [], action ) {
	log.debug('IN REDUCER 😨');
	switch(action.type) {
		case PILLAR_CREATED:
			return pillarCreated(pillars, action.payload);
		case PILLAR_DELETED:
			return pillarDeleted(pillars, action.payload);
		// case PILLAR_NAME_CHANGED:
		// 	return pillarNameChanged(pillars, action.payload);
		default:
			return pillars;
	}
}

function pillarCreated(pillars, payload) {
	log.info('pillars', pillars);
	log.info('payload', payload);
	return [...pillars, payload];
}

function pillarDeleted(pillars, payload) {
	const pillarIndex = _.findIndex(pillars, function(i) {
		return i._id === payload._id;
	});
	const newPillar = Object.assign({}, pillars[pillarIndex], {
		 isDeleted: true
	});
	return [
		...pillars.slice(0, pillarIndex),
		newPillar,
		...pillars.slice(pillarIndex + 1)
	];
}

module.exports = reducer;
