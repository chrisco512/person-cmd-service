const store = require('../../store');
const { unique, required, email, uuid, minLength, integer, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

// const validatePillar = createValidator({
// 	_id: [required, unique, uuid],
// 	first_name: [required, minLength(1)],
// 	last_name: [required, minLength(1)],
// 	phone: [required, integer],
// 	carrier: [],
// 	email: [required, email]
// });
//not sure what to do here....
function validatePillarDeleteCommand(payload) {
	return new Promise((resolve, reject) => {
		const { pillars } = store.getState();
		const pillar = payload;

		// const errors = validatePillar(pillar, null, pillars);
		// const isErrors = Object.keys(errors).length;
		//
		// if(isErrors) {
		// 	return reject({ type: VALIDATION_ERROR, errors });
		// }

		return resolve(payload);
	});
}

module.exports = validatePillarDeleteCommand;
