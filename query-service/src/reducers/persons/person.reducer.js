const _ = require('lodash');
const {
	PERSON_CREATED
	} = require('../../event_types');

function reducer(persons = [], action ) {
	switch(action.type) {
		case PERSON_CREATED:
			return personCreated(perons, action);
	}
	return persons;
}

function personCreated(persons, action) {
	return [...persons, action.payload];
}

module.exports = reducer;
