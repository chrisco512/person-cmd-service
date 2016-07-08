'use strict';
require("babel-polyfill");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const koa = require('koa');
const jsonBody = require('koa-json-body');
const config = require('./config');
const store = require('./store');
const co = require('co');
const cors = require('koa-cors');
const qs = require('koa-qs');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./schema');

const util = require('util');

const bus = require('servicebus').bus({ url: config.servicebus.uri + "?heartbeat=60" });

const {
    pageNotFound, error, unauthorized, unprotected
} = require('./middlewares');
const {
	rebuildQueryModelsFromEvents,
  setupHandlers
} = require('./utils');

const app = koa();
module.exports = app;
const port = process.env.PORT || config.port || 8080;

setupHandlers();

qs(app);
app.use(cors());
app.use(jsonBody({ limit: '10kb' }));
app.use(pageNotFound);
app.use(error);
app.use(unauthorized);
app.use(unprotected);

app.use(mount('/', graphqlHTTP({
    schema,
    graphiql: true,
    formatError: err => {
      if(err.originalError) {
        return { message: err };
      } else {
        return { message: err.message, locations: err.locations };
      }

    }
})));

//START UP
co(function* () {
	yield co(rebuildQueryModelsFromEvents());

	bus.subscribe('#', function (event) {
		console.log('received event in query service: ', event);
		store.dispatch(event);
	});

	//const port = process.env.PORT || 1339;
	app.listen(port, () => {
		console.log(`Listening on port: ${port}`);
	});
});
