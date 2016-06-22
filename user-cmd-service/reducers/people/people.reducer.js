const _ = require('lodash');
const {
	PEOPLE_CREATED
} = require('../../commands/event_types');

function reducer(people = [], action ) {
	console.log("In people reducer - ", action);
	switch(action.type) {
		case PEOPLE_CREATED:
			return personCreated(people, action.payload);
	}
	return people;
}

function personCreated(people, { _id }) {
	return [...people, { _id }];
}

module.exports = reducer;
