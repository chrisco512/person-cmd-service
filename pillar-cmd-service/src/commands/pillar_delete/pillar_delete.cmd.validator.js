const store = require('../../store');
const { unique, required, email, uuid, minLength, integer, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validatePillar = createValidator({
	_id: [required, unique, uuid],
	tenantId: [required],
	name: [required, minLength(1)],
	content: [],
	isSelected: [],
	isDeleted: []
});

function validatePillarDeleteCommand(payload) {
	return new Promise((resolve, reject) => {
		const { pillars } = store.getState();
		const pillar = payload;

		const errors = validatePillar(pillar, null, pillars);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			log.info('ERROR 😡', errors);
			return reject({ type: VALIDATION_ERROR, errors });
		}

		return resolve(payload);
	});
}

module.exports = validatePillarDeleteCommand;
