const { TENANT_EMPLOYEE_DATA_IMPORTED } = require('../event_types');
const uuid = require('node-uuid');

function tenantEmployeeDataImported({ eeid, tenantID, name, phone, email }) {
	console.log('EVENT CREATOR:', { eeid, tenantID, name, phone, email });
	const _id = uuid.v4();

	return Promise.resolve({
		type: TENANT_EMPLOYEE_DATA_IMPORTED,
		payload: { _id, eeid, tenantID, name, phone, email }
	});
}

module.exports = tenantEmployeeDataImported;
