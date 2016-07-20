const store = require('../../store');
const { unique, required, uuid, minLength, createValidator, valueExistsInCollection } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');
const log = require('../../log');

const validatePillar = createValidator({
	// _id: [required, uuid, valueExistsInCollection],
	// tenantId: [required],
	pillarName: [required, minLength(1)],
	index: []
	// content: [],
	// isSelected: [],
	// isDeleted: []
});

function validatePillarNameChangeCommand(payload) {
	return new Promise((resolve, reject) => {
		const { pillars } = store.getState();
		const pillar = payload;
		log.info('INSIDE PILLAR NAME CHANGE COMMAND');
		const errors = validatePillar(pillar, null, pillars);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			log.info('ERROR 😡', errors);
			return reject({ type: VALIDATION_ERROR, errors });
		}

		return resolve(payload);
	});
}

module.exports = validatePillarNameChangeCommand;
