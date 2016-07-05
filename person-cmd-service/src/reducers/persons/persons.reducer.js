const {
	PERSON_CREATED
} = require('../../commands/event_types');
const log = require('../../log');

function reducer(persons = [], event) {
	log.debug('IN REDUCER');

	switch(event.type) {
		case PERSON_CREATED:
			return personCreated(persons, event.payload);
	}
	return persons;
}

function personCreated(persons, payload) {
	return [...persons, payload];
}

module.exports = reducer;