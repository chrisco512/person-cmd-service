const validateCommand = require('./tenant_employee_import_data.cmd.validator.js');
const createEvent = require('./tenant_employee_import_data.event.creator.js');
const dispatchEvent = require('../../common/dispatch_event.chainable');
const persistEvent = require('../../common/persist_event.chainable');
const publishEvent = require('../../common/publish_event.chainable');

function tenantEmployeeImportDataCommandHandler(payload) {
	console.log('Handling TENANT_EMPLOYEE_DATA_IMPORTED command');

	return validateCommand(payload)
		.then(createEvent)
		.then(dispatchEvent)
		.then(persistEvent)
		.then(publishEvent)
		.catch(function(err) {
			console.log('Error: Need to handle errors better here ', err);
		});
}

module.exports = tenantEmployeeImportDataCommandHandler;