const {
	PERSON_CREATE,
	PERSON_FIRST_NAME_CHANGE,
	PERSON_LAST_NAME_CHANGE,
	PERSON_EMAIL_CHANGE,
	PERSON_PHONE_CHANGE,
	PERSON_CARRIER_CHANGE
} = require('./command_types');
const {
	INVALID_COMMAND
} = require('../error_types');

const personCreateCommandHandler = require('./person_create');
const personFirstNameChangeHandler = require('./person_first_name_change');
const personLastNameChangeHandler = require('./person_last_name_change');
const personEmailChangeHandler = require('./person_email_change');
const personPhoneChangeHandler = require('./person_phone_change');
const personCarrierChangeHandler = require('./person_carrier_change');

function commandHandler(command) {
	const { payload } = command;

	switch (command.type) {
		case PERSON_CREATE:
			return personCreateCommandHandler(payload);
		case PERSON_FIRST_NAME_CHANGE:
			return personFirstNameChangeHandler(payload);
		case PERSON_LAST_NAME_CHANGE:
			return personLastNameChangeHandler(payload);
		case PERSON_EMAIL_CHANGE:
			return personEmailChangeHandler(payload);
		case PERSON_PHONE_CHANGE:
			return personPhoneChangeHandler(payload);
		case PERSON_CARRIER_CHANGE:
			return personCarrierChangeHandler(payload);
		default:
			throw { type: INVALID_COMMAND };
	}
	//TODO: Handle case where command not found
}

module.exports = commandHandler;
