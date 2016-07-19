const commandHandler = require('../commands');
const { VALIDATION_ERROR, SERVER_ERROR } = require('../error_types');

function* commandRoute() {
	const request = this.request.body;
	let status;
	let body = '';

	try {
		const { payload } = yield commandHandler(request);
		status = 200;
		body = payload;
	} catch(err) {
                status = 500;

		if(err.type === VALIDATION_ERROR) {
			status = 400;
			body = err.errors;
		}
                if(err.type === SERVER_ERROR) {
                        status = 500;
                } else {
                        body = err
                }
        }

	this.response.status = status;
	this.response.body = body;
}

module.exports = commandRoute;
