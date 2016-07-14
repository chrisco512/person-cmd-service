const _ = require('lodash');
const store = require('../../store');
const { createValidator, required, minLength, integer, email } = require('validations');

const validateEmployee = createValidator({
  eeid: [integer],
  tenantID: [required],
  name: [required],
  phone: [required, integer],
  email: [required, email]
});

function validateTenantEmployeeDataImportCommand(payload) {
	return new Promise((resolve, reject) => {
		const employee = payload;

		const errors = validateEmployee(employee);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			return reject(errors);
		}
		console.log('VALIDATED COMMAND:', payload);
		return resolve(payload);
	});
}

module.exports = validateTenantEmployeeDataImportCommand;
