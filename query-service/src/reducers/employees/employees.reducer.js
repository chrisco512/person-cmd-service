const _ = require('lodash');
const {
	TENANT_EMPLOYEE_DATA_IMPORTED
	} = require('../../event_types');

function reducer(employees = [], action ) {
	switch(action.type) {
		case TENANT_EMPLOYEE_DATA_IMPORTED:
			return tenantEmployeeDataImported(employees, action);
		default:
			return employees;
	}
}

function tenantEmployeeDataImported(employees, action) {
	return [...employees, action.payload];
}

module.exports = reducer;
