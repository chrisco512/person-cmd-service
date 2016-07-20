const commandHandler = require('../commands');
const { VALIDATION_ERROR, SERVER_ERROR, BAD_REQUEST } = require('../error_types');
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
		log.info('ERROR 😡', err);
		if(err.type === VALIDATION_ERROR) {
			status = 400;
			body = err.errors;
		}
		if(err.type === SERVER_ERROR) {
			status = 500;
		}
		if(err.type === BAD_REQUEST) {
			status = 400;
		}
	}

	this.response.status = status;
	this.response.body = body;
}

module.exports = commandRoute;
