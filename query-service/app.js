'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require("babel-polyfill");

const koa = require('koa');
const jwt = require('koa-jwt');
const util = require('util');
// const router = require('koa-router')();
const jsonBody = require('koa-json-body');
const config = require('./config');
const store = require('./store/store');
const co = require('co');
const cors = require('koa-cors');
const qs = require('koa-qs');
const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./schema');

const bus = require('servicebus').bus({ url: config.servicebus.uri + "?heartbeat=60" });

const {
    pageNotFound, error, unauthorized, unprotected
} = require('./middlewares');
const {
	rebuildQueryModelsFromEvents
} = require('./utils');

module.exports = const app = koa();
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
    schema: schema,
    graphiql: true
})));



// app
//     .use(router.routes())
//     .use(router.allowedMethods());


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

function setupHandlers() {
    // Quit Node Properly with Ctrl+C
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
