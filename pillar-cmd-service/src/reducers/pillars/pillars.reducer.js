const log = require('../../log');
const _ = require('lodash');
const {
	PILLAR_CREATED,
	PILLAR_DELETED,
	PILLAR_NAME_CHANGED
} = require('../../commands/event_types');

function reducer(pillars = [], action ) {
	log.info('IN PILLAR REDUCER 👷');
	switch(action.type) {
		case PILLAR_CREATED:
			return pillarCreated(pillars, action.payload);
		case PILLAR_DELETED:
			return pillarDeleted(pillars, action.payload);
		case PILLAR_NAME_CHANGED:
			return pillarNameChanged(pillars, action.payload);
		default:
			return pillars;
	}
}

function pillarCreated(pillars, payload) {
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

function pillarNameChanged(pillars, payload) {
	const { index } = payload;
	const pillarName = payload.name;
	const newPillar = Object.assign({}, pillars[index], {
		name: pillarName
	});
	return [
		...pillars.slice(0, index),
		newPillar,
		...pillars.slice(index + 1)
	];
}

module.exports = reducer;
