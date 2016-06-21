const _ = require('lodash');
const store = require('../../store/store');
const { createValidator, required, minLength, integer, email, uuid, valueExistsInCollection } = require('validations');

const validateUser = createValidator({
  role: [required],
  tenantID: [required, uuid],
  auth0ID: [required],
  personID: [required, uuid],
  companyIdentifier: [required]
});

const validateTenant = createValidator({
	_id: [valueExistsInCollection]
});

const validatePerson = createValidator({
	_id: [valueExistsInCollection]
})

function validateUserCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { userAggregate, tenants, people } = store.getState();
		const user = payload;

		const userErrors = validateUser(user, userAggregate);
		const tenantErrors = validateTenant({ _id: user.tenantID }, tenants);
		const personErrors = validateTenant({ _id: user.personID }, people);

		if (tenantErrors._id) {
			userErrors.tenantID = tenantErrors._id;
		}

		if (personErrors._id) {
			userErrors.personID = personErrors._id;
		}

		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject(errors);
		}
		console.log('VALIDATED COMMAND:', payload);
		resolve(payload);
	});
}

module.exports = validateUserCreateCommand;
