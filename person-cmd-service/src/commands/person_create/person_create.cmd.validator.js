const store = require('../../store');
const { unique, required, email, uuid, minLength, integer, createValidator, oneOf } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const carrierEnum = [
 'AT&T',
 'T-Mobile',
 'Verizon',
 'Sprint',
 'Virgin Mobile',
 'Tracfone',
 'Metro PCS',
 'Boost Mobile',
 'Cricket',
 'Nextel',
 'Alltel',
 'Ptel',
 'Suncom',
 'Qwest',
 'U.S. Cellular'
];

const validatePerson = createValidator({
	_id: [required, unique, uuid],
	firstName: [required, minLength(1)],
	lastName: [required, minLength(1)],
	phone: [required, integer],
	carrier: [oneOf(carrierEnum)],
	email: [required, email]
});

function validatePersonCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { persons } = store.getState();
		const person = payload;

		const errors = validatePerson(person, null, persons);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			return reject({
				type: VALIDATION_ERROR,
				errors
			});
		}

		return resolve(payload);
	});
}

module.exports = validatePersonCreateCommand;
