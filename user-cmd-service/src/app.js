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
const body = require('koa-better-body');
const { rebuildMeetingsFromEvents, setupHandlers } = require('./utils');

const { commandRoute } = require('./routes');
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

if(process.env.NODE_ENV === 'development') {
	router.get('/users', function* () {
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
}

router.post('/', commandRoute);

app
	.use(router.routes())
	.use(router.allowedMethods());

//START UP
co(function* () {
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