'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const koa = require('koa');
const jwt = require('koa-jwt');
const util = require('util');
const router = require('koa-router')();
const { pageNotFound, error, unauthorized, unprotected } = require('./middlewares');
const jsonBody = require('koa-json-body');
const config = require('./config');
const store = require('./store/store');
const co = require('co');
const cors = require('koa-cors');
const log = require('./log');
const { VALIDATION_ERROR, SERVER_ERROR } = require('./errorTypes');


const { rebuildMeetingsFromEvents } = require('./utils');
const commandHandler = require('./commands');
const app = module.exports = koa();
const port = process.env.PORT || config.port || 8080;

setupHandlers();

app.use(cors());
app.use(jsonBody({ limit: '10kb' }));
app.use(pageNotFound);
app.use(error);
app.use(unauthorized);
app.use(unprotected);

router.get('/', function *() {
	this.response.status = 200;
	this.body = 'Demo Application | Person Service operational.';
});

// if(process.env.NODE_ENV === 'development') {
router.get('/person_aggregates', function* () {
	this.response.status = 200;
	this.body = store.getState().personAggregate;
});

router.post('/', function *() {
	const request = this.request.body;
	let status = 200;
	let body = "";

	try {
		const { payload } = yield commandHandler(request);
		status = 200;
		body = payload;
	} catch(err) {
		if(err.type === VALIDATION_ERROR) {
			status = 400;
			body = err.errors;
		}
		if(err.type === SERVER_ERROR) {
			status = 500;
		}
	}

	this.response.status = status;
	this.response.body = body;
});

app
	.use(router.routes())
	.use(router.allowedMethods());

//START UP
co(function* () {
	yield chillOut(5000);
	yield co(rebuildMeetingsFromEvents());
	app.listen(port, () => {
		console.log(`Listening on port: ${port}`);
	});
});

function chillOut(amount) {
	return new Promise((resolve, reject) => {
		setTimeout(function() {
			return resolve("chilled.");
		}, amount)
	});
}

function setupHandlers() {
	/* Quit Node Properly with Ctrl+C */
	process.on('SIGINT', function() {
		console.log("Gracefully shutting down from SIGINT (Ctrl+C)");
		process.exit();
	});

	// error handler
	app.on('error', function(err) {
		if (process.env.NODE_ENV != 'test') {
			console.log('sent error %s to the cloud', util.inspect(err));
		}
	});
}