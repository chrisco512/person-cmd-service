const _ = require('lodash');
const {
	PEOPLE_CREATED
} = require('../../commands/event_types');

const seedState = [{
	_id: '28f0e756-0304-492e-9418-f51dd3c64700'
}];

function reducer(people = seedState, action ) {
	console.log("In people reducer - ", action);
	switch(action.type) {
		case PEOPLE_CREATED:
			return tenantCreated(people, action.payload);
	}
	return people;
}

function tenantCreated(people, { _id }) {
	return [...people, { _id }];
}

module.exports = reducer;
