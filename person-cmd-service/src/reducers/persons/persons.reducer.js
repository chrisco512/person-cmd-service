const {
	PERSON_CREATED,
	PERSON_FIRST_NAME_CHANGED,
	PERSON_LAST_NAME_CHANGED,
	PERSON_EMAIL_CHANGED,
	PERSON_PHONE_CHANGED,
	PERSON_CARRIER_CHANGED
} = require('../../commands/event_types');
const log = require('../../log');
const _ = require('lodash');

function reducer(persons = [], event) {
	log.debug('IN REDUCER');

	switch(event.type) {
		case PERSON_CREATED:
			return personCreated(persons, event.payload);
		case PERSON_FIRST_NAME_CHANGED:
			return personFirstNameChanged(persons, event.payload);
		case PERSON_LAST_NAME_CHANGED:
			return personLastNameChanged(persons, event.payload);
		case PERSON_EMAIL_CHANGED:
			return personEmailChanged(persons, event.payload);
		case PERSON_PHONE_CHANGED:
			return personPhoneChanged(persons, event.payload);
		case PERSON_CARRIER_CHANGED:
			return personCarrierChanged(persons, event.payload);
	}
	return persons;
}

function personCreated(persons, payload) {
	return [...persons, payload];
}

function personFirstNameChanged(persons, payload) {
	const personIndex = _.findIndex(persons, function(person) {
		return person._id === payload._id;
	});
	const modifiedPerson = Object.assign({}, persons[personIndex], {
		 firstName: payload.firstName
	});
	return [
		...persons.slice(0, personIndex),
		modifiedPerson,
		...persons.slice(personIndex + 1)
	];
}

function personLastNameChanged(persons, payload) {
	const personIndex = _.findIndex(persons, function(person) {
		return person._id === payload._id;
	});
	const modifiedPerson = Object.assign({}, persons[personIndex], {
		 lastName: payload.lastName
	});
	return [
		...persons.slice(0, personIndex),
		modifiedPerson,
		...persons.slice(personIndex + 1)
	];
}

function personEmailChanged(persons, payload) {
	const personIndex = _.findIndex(persons, function(person) {
		return person._id === payload._id;
	});
	const modifiedPerson = Object.assign({}, persons[personIndex], {
		 email: payload.email
	});
	return [
		...persons.slice(0, personIndex),
		modifiedPerson,
		...persons.slice(personIndex + 1)
	];
}

function personPhoneChanged(persons, payload) {
	const personIndex = _.findIndex(persons, function(person) {
		return person._id === payload._id;
	});
	const modifiedPerson = Object.assign({}, persons[personIndex], {
		 phone: payload.phone
	});
	return [
		...persons.slice(0, personIndex),
		modifiedPerson,
		...persons.slice(personIndex + 1)
	];
}

function personCarrierChanged(persons, payload) {
	const personIndex = _.findIndex(persons, function(person) {
		return person._id === payload._id;
	});
	const modifiedPerson = Object.assign({}, persons[personIndex], {
		 carrier: payload.carrier
	});
	return [
		...persons.slice(0, personIndex),
		modifiedPerson,
		...persons.slice(personIndex + 1)
	];
}

module.exports = reducer;
