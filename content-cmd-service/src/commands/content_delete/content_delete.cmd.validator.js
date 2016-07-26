const store = require('../../store/store');
const { required, uuid, minLength, createValidator, valueExistsInCollection } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');
const log = require('../../log');

const validateContent = createValidator({
	_id: [required, valueExistsInCollection, uuid],
	pillarId: [required],
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
	},
	isDeleted: []
});

function validateContentDeleteCommand(payload) {
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

module.exports = validateContentDeleteCommand;
