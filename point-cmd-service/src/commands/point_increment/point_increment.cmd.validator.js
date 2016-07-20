const store = require('../../store');
const { createValidator, required, integer, valueExistsInCollection } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validatePoint = createValidator({
  userId: [required, valueExistsInCollection],
  count: [required, integer]
});

function validatePointIncrementCommand(payload) {
	return new Promise((resolve, reject) => {
		const { points } = store.getState();

		const errors = validatePoint(payload, null, points);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject({ type: VALIDATION_ERROR, errors });
		}

		resolve(payload);
	});
}

module.exports = validatePointIncrementCommand;
