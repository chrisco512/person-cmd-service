const _ = require('lodash');
const {
	PILLAR_CREATED
	} = require('../../event_types');

function reducer(pillars = [], action ) {
	switch(action.type) {
		case PILLAR_CREATED:
			return pillarCreated(pillars, action);
	}
	return pillars;
}

function pillarCreated(pillars, action) {
	return [...pillars, action.payload];
}

module.exports = reducer;
