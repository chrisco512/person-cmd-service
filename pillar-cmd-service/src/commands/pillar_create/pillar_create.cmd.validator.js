const store = require('../../store/store');
const { unique, required, uuid, minLength, createValidator } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validatePillar = createValidator({
	_id: [required, unique, uuid],
	tenantId: [unique],
	name: [required, minLength(1)],
	content: [],
	isSelected: [],
	isDeleted: []
});

function validatePillarCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { pillars } = store.getState();
		const pillar = payload;

		const errors = validatePillar(pillar, null, pillars);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			return reject({ type: VALIDATION_ERROR, errors });
		}

		return resolve(payload);
	});
}

module.exports = validatePillarCreateCommand;