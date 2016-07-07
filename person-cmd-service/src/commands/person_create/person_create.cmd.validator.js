const store = require('../../store');
const { unique, required, email, uuid, minLength, integer, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validatePerson = createValidator({
	_id: [required, unique, uuid],
	first_name: [required, minLength(1)],
	last_name: [required, minLength(1)],
	phone: [required, integer],
	carrier: [],
	email: [required, email]
});

function validatePersonCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { persons } = store.getState();
		const person = payload;

		const errors = validatePerson(person, null, persons);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			return reject({ type: VALIDATION_ERROR, errors });
		}

		return resolve(payload);
	});
}

module.exports = validatePersonCreateCommand;
