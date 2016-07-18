const store = require('../../store');
const { unique, required, email, uuid, minLength, integer, createValidator, valueExistsInCollection } = require('validations');
const log = require('../../log');
const { VALIDATION_ERROR } = require('../../error_types');

const validatePillar = createValidator({
	_id: [required, uuid, valueExistsInCollection],
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
		log.info('validatePillarDeleteCommand PAYLOAD', pillar);

		const errors = validatePillar(pillar, null, pillars);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			log.info('ERROR 😡', errors);
			return reject({ type: VALIDATION_ERROR, errors });
		}
		log.info('VALIDATIONS PASSED 👏');
		return resolve(payload);
	});
}

module.exports = validatePillarDeleteCommand;
