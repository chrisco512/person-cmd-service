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
}, {
  tenantID: {
    primary: '_id',
    collection: 'tenants'
  },
  personID: {
    primary: '_id',
    collection: 'people'
  }
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

		const user = payload;

		const errors = validateUser(user, null, {
      tenants: tenants,
      people: people
    });

		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject({ type: VALIDATION_ERROR, errors });
		}
		console.log('VALIDATED COMMAND:', payload);
		resolve(payload);
	});
}

module.exports = validateUserCreateCommand;
