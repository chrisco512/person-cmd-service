const log = require('../log');
const parse = require('../utils/parse_csv');
const co = require('co');
const { employeeImportSaga } = require('../sagas');

function* employeeRecordImportRoute () {
	log.info('Hit CSV user endpoint');
	const path = this.body.files.csvFile.path;
	const tenantID = this.body.tenantID;
	const type = this.body.type;

	let status = 200;
	let body = '';
	let employees;
	try {
		employees = yield parse(path, tenantID, type);
	} catch (err) {
		status = 400;
		body = err;
	}

	let employeesCreated = 0;
	let errorCount = 0;

	if (employees) {
		for (const employee of employees) {
			try {
				yield co(employeeImportSaga(employee, tenantID));
				employeesCreated++;
			} catch (err) {
				errorCount++;
				log.info("Error on employee import - ", err);
			}
		}

		body = {
			employeesCreated,
			errorCount
		};
	}

	this.response.status = status;
	this.body = body;
}

module.exports = employeeRecordImportRoute;