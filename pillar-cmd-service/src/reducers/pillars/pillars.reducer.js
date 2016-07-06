const {
	PILLAR_CREATED,
	PILLAR_DELETED
} = require('../../commands/event_types');
const log = require('../../log');

function reducer(pillars = [], action ) {
	log.debug('IN REDUCER');

	switch(action.type) {
		case PILLAR_CREATED:
			return pillarCreated(pillars, action.payload);
	}
	return pillars;
}

function pillarCreated(pillars, payload) {
	console.log('pillars', pillars);
	console.log('payload', payload);
	return [...pillars, payload];
}

module.exports = reducer;
