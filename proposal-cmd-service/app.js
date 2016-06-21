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
	this.body = 'Demo Application | Proposal Service operational.';
});

// if(process.env.NODE_ENV === 'development') {
	router.get('/proposal_aggregates', function* () {
		this.response.status = 200;
		this.body = store.getState().proposalAggregate;
	});

	router.post('/', function *() {
		const request = this.request.body;
		commandHandler(request);
		this.response.status = 201;
		this.body = 'Command Received';
	});
// }

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