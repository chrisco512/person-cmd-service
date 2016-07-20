const commandHandler = require('../commands');
const { VALIDATION_ERROR } = require('../error_types');
const log = require('../log');

function* commandRoute() {
	const request = this.request.body;
	let status = 500;
	let body = '';

	try {
		const { payload } = yield commandHandler(request);
		status = 200;
		body = payload;
	} catch(err) {
		log.error('💥  ERR IN COMMAND ROUTE: ', err);

		if(err.type === VALIDATION_ERROR) {
			status = 400;
			body = err.errors;
		}
	}

	this.response.status = status;
	this.response.body = body;
}

module.exports = commandRoute;
