const {
	PERSON_CREATED
} = require('../../commands/event_types');

function reducer(persons = [], action ) {
	console.log("In proposal reducer - ", action);
	switch(action.type) {
		case PERSON_CREATED:
			return personCreated(persons, action.payload);
	}
	return persons;
}

function personCreated(persons, payload) {
	console.log("Making proposal with action - ", PERSON_CREATED);
	return [...persons, payload];
}

module.exports = reducer;