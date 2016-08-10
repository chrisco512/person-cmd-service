const store = require('../../store/store');
const { required, minLength, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');
const log = require('../../log');

const validateContent = createValidator({
	data: {
		url: [required, minLength(1)]
	},
	index: []
});

function validateContentUrlChangeCommand(payload) {
	return new Promise((resolve, reject) => {
		const { contents } = store.getState();
		const content = payload;

		const errors = validateContent(content, null, contents);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			log.info('ERROR 😡', errors);
			return reject({ type: VALIDATION_ERROR, errors });
		}
		log.info('VALIDATIONS PASSED 👏');
		return resolve(payload);
	});
}

module.exports = validateContentUrlChangeCommand;
