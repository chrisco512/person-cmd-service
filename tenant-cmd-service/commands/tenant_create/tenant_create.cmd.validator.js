const _ = require('lodash');
const store = require('../../store/store');
const { createValidator, required, minLength, email, integer } = require('validations');

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

		const errors = validateTenant(tenant, tenantAggregate);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject(errors);
		}
		console.log('VALIDATED COMMAND:', payload);
		resolve(payload);
	});
}

module.exports = validateTenantCreateCommand;
