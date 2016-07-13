const store = require('../../store');
const { createValidator, required, minLength, email, integer } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validateTenant = createValidator({
  name: [required, minLength(4)],
  address: [required, minLength(7)],
  contact: {
    name: [required, minLength(5)],
    email: [required, email],
    phone: [required, integer]
  }
});

function validateTenantCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { tenantAggregate } = store.getState();
		const tenant = payload;

		const errors = validateTenant(tenant, null, tenantAggregate);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject({ type: VALIDATION_ERROR, errors });
		}
		console.log('VALIDATED COMMAND:', payload);
		resolve(payload);
	});
}

module.exports = validateTenantCreateCommand;
