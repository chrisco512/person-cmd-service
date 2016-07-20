const store = require('../../store');
const { valueExistsInCollection, required, uuid, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

//TODO: validate that the carrier is one of the carriers enum
const validatePayload = createValidator({
	_id: [required, valueExistsInCollection, uuid],
	carrier: [required]
});

function validatePersonCarrierChangeCommand(payload) {
	return new Promise((resolve, reject) => {
		const { persons } = store.getState();
		const person = payload;

		const errors = validatePayload(person, null, persons);
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

module.exports = validatePersonCarrierChangeCommand;
