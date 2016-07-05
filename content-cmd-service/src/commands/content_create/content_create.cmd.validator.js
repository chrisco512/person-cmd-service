const store = require('../../store/store');
const { unique, required, uuid, minLength, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validateContent = createValidator({
	_id: [required, unique, uuid],
	pillarId: [unique],
	type: [required, minLength(1)],
	data: {
		//for type: video
		title: [],
		description: [],
		url: [],
		//for type: quote
		quote: [],
		author: [],
		//for type: lunch meeting (lunch roulette)
		recipient: [],
		recipientPosition: []
	}
});

function validateContentCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { contents } = store.getState();
		const content = payload;

		const errors = validateContent(content, null, contents);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			return reject({ type: VALIDATION_ERROR, errors });
		}

		return resolve(payload);
	});
}

module.exports = validateContentCreateCommand;
