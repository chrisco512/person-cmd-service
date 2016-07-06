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


const IncomingForm = require('formidable');
const { Converter } = require("csvtojson");
const body = require('koa-better-body');
const form = require('./signupForm');
const { rebuildMeetingsFromEvents } = require('./utils');
const commandHandler = require('./commands');
const { TENANT_CREATE, TENANT_EMPLOYEE_DATA_IMPORT } = require('./commands/command_types');
const app = module.exports = koa();
const port = process.env.PORT || config.port || 1996;

setupHandlers();

app.use(cors());
// app.use(jsonBody({ limit: '10kb' }));
app.use(pageNotFound);
app.use(error);
app.use(unauthorized);
app.use(unprotected);

router.get('/', function *() {
	this.response.status = 200;
	this.body = 'Demo Application | Tenant Service operational.';
});

router.get('/tenants', function* () {
	this.response.status = 200;
	this.body = store.getState().tenantAggregate;
});

router.post('/tenants',
		jsonBody({ limit: '10kb' }),
		function *() {
			// const request = this.request.body;
			const request = this.request.body;
			console.log("Tenant endpoint hit with body - ", request);
			const command = {type: request.type, payload: request.payload};

			console.log('Made tenant create command - ', command);
			const { payload } = yield commandHandler(command);
			this.response.status = 200;
			console.log("Reponse content - ", payload);
			this.body = payload;
		});

// router.post('/csv',
// 		body({
// 			IncomingForm: form,
// 			onerror: (err, ctx) => {
// 				console.log('Error in koa body - ', err, '. With context - ', ctx);
// 				throw err;
// 			}
// 		}),
// 		function *() {
// 			console.log('Hit CSV tenant endpoint');
// 			const path = this.body.files.csvFile.path;
// 			const tenantID = this.body.tenantID;
// 			const type = this.body.type;
// 			const converter = new Converter({});

// 			//record_parsed will be emitted each csv row being processed
// 			converter.on("record_parsed", employee => {
// 				console.log('Employee received: ', employee);
// 				const { eeid, name, phone, email } = employee;
// 				const command = {
// 					type,
// 					payload: {
// 						eeid,
// 						tenantID,
// 						name,
// 						phone,
// 						email
// 					}
// 				};

// 				commandHandler(command).then(event => {

// 				});
// 			});

// 			//end_parsed will be emitted once parsing finished
// 			converter.on("end_parsed", () => {
// 				fs.unlink(path);
// 			});

// 			fs.createReadStream(path).pipe(converter);

// 			this.response.status = 201;
// 			this.body = 'CSV received';
// 		});

app
	.use(router.routes())
	.use(router.allowedMethods());

//START UP
co(function* () {
	// yield chillOut(5000);
	yield co(rebuildMeetingsFromEvents());
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
