const _ = require('lodash');
const store = require('../../store/store');
const { createValidator, required, minLength, integer, email, uuid, valueExistsInCollection } = require('validations');
const { VALIDATION_ERROR } = require("../../error_types");

const validateUser = createValidator({
  role: [required],
  tenantID: [required, uuid],
  auth0ID: [required],
  personID: [required, uuid],
  companyIdentifier: [required],
  email: [required]
});

const validateTenant = createValidator({
	_id: [required, valueExistsInCollection]
});

const validatePerson = createValidator({
	_id: [required, valueExistsInCollection]
})

function validateUserCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { userAggregate, tenants, people } = store.getState();

		console.log("tenants - ", tenants);
		const user = payload;

		console.log("User - ", { _id: user.tenantID });

		const userErrors = validateUser(user, null, userAggregate);
		const tenantErrors = validateTenant({ _id: user.tenantID }, null, tenants);
		const personErrors = validatePerson({ _id: user.personID }, null, people);

		console.log("Tenant errors - ", tenantErrors);

		if (tenantErrors._id) {
			userErrors.tenantID = tenantErrors._id;
		}

		if (personErrors._id) {
			userErrors.personID = personErrors._id;
		}

		const isErrors = Object.keys(userErrors).length;

		if(isErrors) {
			reject({ type: VALIDATION_ERROR, errors });
		}
		console.log('VALIDATED COMMAND:', payload);
		resolve(payload);
	});
}

module.exports = validateUserCreateCommand;
