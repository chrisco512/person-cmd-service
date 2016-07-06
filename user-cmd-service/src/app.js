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
const bus = require('servicebus').bus({ url: config.servicebus.uri + "?heartbeat=60" });
const fs = require('fs');
const { VALIDATION_ERROR, SERVER_ERROR } = require('./error_types');


const IncomingForm = require('formidable');
const { Converter } = require("csvtojson");
const body = require('koa-better-body');
const form = require('./signupForm');
const { rebuildMeetingsFromEvents } = require('./utils');
const commandHandler = require('./commands');
const { USER_CREATE } = require('./commands/command_types');
const app = module.exports = koa();
const port = process.env.PORT || config.port || 1996;

setupHandlers();

app.use(cors());
app.use(jsonBody({ limit: '10kb' }));
app.use(pageNotFound);
app.use(error);
app.use(unauthorized);
app.use(unprotected);

router.get('/', function *() {
	this.response.status = 200;
	this.body = 'Demo Application | User Service operational.';
});

router.get('/user_aggregates', function* () {
	this.response.status = 200;
	this.body = store.getState().userAggregate;
});

router.get('/tenants', function* () {
	this.response.status = 200;
	this.body = store.getState().tenants;
});

router.get('/people', function* () {
	this.response.status = 200;
	this.body = store.getState().people;
});

router.post('/', function * () {
	const request = this.request.body;
	let status = 200;
	let body = '';

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



// function parse(path, tenantID, type) {
// 	return new Promise((resolve, reject) => {
// 		let employeesCreated = 0;
// 		let errors = 0;

// 		const converter = new Converter({});
// 		//record_parsed will be emitted each csv row being processed
// 		converter.on("record_parsed", employee => {
// 			console.log('Employee received: ', employee);
// 			const { eeid, name, phone, email } = employee;
// 			const command = {
// 				type,
// 				payload: {
// 					eeid,
// 					tenantID,
// 					name,
// 					phone,
// 					email
// 				}
// 			};

// 			commandHandler(command).then(event => {
// 				employeesCreated++;
// 			}).catch( err => {
// 				errors++;
// 			});
// 		});

// 		//end_parsed will be emitted once parsing finished
// 		converter.on("end_parsed", () => {
// 			fs.unlink(path);
// 			resolve({
// 				employeesCreated,
// 				errors
// 			});
// 		});

// 		fs.createReadStream(path).pipe(converter);
// 	});
// }

// router.post('/csv',
// 		body({
// 			IncomingForm: form,
// 			onerror: (err, ctx) => {
// 				console.log('Error in koa body - ', err, '. With context - ', ctx);
// 				throw err;
// 			}
// 		}),
// 		function *() {
// 			console.log('Hit CSV user endpoint');
// 			const path = this.body.files.csvFile.path;
// 			const tenantID = this.body.tenantID;
// 			const type = this.body.type;

// 			const parseResults = yield parse(path, tenantID, type);

// 			this.response.status = 200;
// 			this.body = parseResults;
// 		});

app
	.use(router.routes())
	.use(router.allowedMethods());

//START UP
co(function* () {
	// yield chillOut(5000);
	yield co(rebuildMeetingsFromEvents());

    bus.subscribe('tenant.*', function (event) {
        console.log('received event in user service: ', event);
        store.dispatch(event);
    });

    bus.subscribe('person.*', function (event) {
        console.log('received event in user service: ', event);
        store.dispatch(event);
    });

	app.listen(port, () => {
		console.log(`Listening on port: ${port}`);
	});
});

// function chillOut(amount) {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(function() {
// 			return resolve("chilled.");
// 		}, amount)
// 	});
// }

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
