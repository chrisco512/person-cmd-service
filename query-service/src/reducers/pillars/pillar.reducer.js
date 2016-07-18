const _ = require('lodash');
const {
	PILLAR_CREATED,
	PILLAR_DELETED
	} = require('../../event_types');

function reducer(pillars = [], action ) {
	switch(action.type) {
		case PILLAR_CREATED:
			return pillarCreated(pillars, action.payload);
		case PILLAR_DELETED:
			return pillarDeleted(pillars, action.payload);
	}
	return pillars;
}

function pillarCreated(pillars, payload) {
	return [...pillars, payload];
}

function pillarDeleted(pillars, payload) {
	console.log('pillarDeletedPayload:', payload);
	var pillarIndex = _.findIndex(pillars, function(i) {
		return i._id === payload._id;
	});
	console.log(pillarIndex);
	const newPillar = Object.assign({}, pillars[pillarIndex], {
		 isSelected: false,
		 isDeleted: true
	});
	return [
		...pillars.slice(0, pillarIndex),
		newPillar,
		...pillars.slice(pillarIndex + 1)
	]

}

module.exports = reducer;
