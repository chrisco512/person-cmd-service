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
	}
	return pillars;
}

function pillarCreated(pillars, payload) {
	log.info('pillars', pillars);
	log.info('payload', payload);
	return [...pillars, payload];
}

function pillarDeleted(pillars, payload) {
	console.log('pillarDeletedPayload:', payload);
	var pillarIndex = _.findIndex(pillars, function(i) {
		return i._id === payload._id;
	});
	console.log(pillarIndex);
}

module.exports = reducer;
