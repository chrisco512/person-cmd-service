const store = require('../../store/store');
const { unique, required, email, uuid, minLength, integer, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

// const validateContent = createValidator({
// 	_id: [required, unique, uuid],
// 	first_name: [required, minLength(1)],
// 	last_name: [required, minLength(1)],
// 	phone: [required, integer],
// 	carrier: [],
// 	email: [required, email]
// });
//not sure what to do here....
function validateContentDeleteCommand(payload) {
	return new Promise((resolve, reject) => {
		const { contents } = store.getState();
		const content = payload;

		// const errors = validateContent(content, null, contents);
		// const isErrors = Object.keys(errors).length;
		//
		// if(isErrors) {
		// 	return reject({ type: VALIDATION_ERROR, errors });
		// }

		return resolve(payload);
	});
}

module.exports = validateContentDeleteCommand;
