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
const fs = require('fs');
const log = require('./log');
const body = require('koa-better-body');
const { rebuildMeetingsFromEvents, setupHandlers } = require('./utils');
const commandHandler = require('./commands');
const { commandRoute } = require('./routes');
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
	this.body = 'Demo Application | Tenant Service operational.';
});

if(process.env.NODE_ENV === 'development') {
	router.get('/tenants', function* () {
		this.response.status = 200;
		this.body = store.getState().tenantAggregate;
	});
}

router.post('/', commandRoute);

app
	.use(router.routes())
	.use(router.allowedMethods());

//START UP
co(function* () {
	// yield chillOut(5000);
	yield co(rebuildMeetingsFromEvents());
	app.listen(port, () => {
		log.info(`Listening on port: ${port}`);
	});
});
