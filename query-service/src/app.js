require("babel-polyfill");
const co = require('co');
const config = require('./config');
const store = require('./store');
const schema = require('./schema');
const app = require('./express');

const bus = require('servicebus').bus({ url: config.servicebus.uri + "?heartbeat=60" });
const {
	rebuildQueryModelsFromEvents,
  setupHandlers
} = require('./utils');

const { port } = config;

setupHandlers();

app.use( cors() );
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    formatError: err => {
      if(err.originalError) {
        return { message: err };
      } else {
        return { message: err.message, locations: err.locations };
      }

    }
}));

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
