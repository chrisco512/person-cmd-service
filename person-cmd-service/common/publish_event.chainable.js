//Will be in charge of publishing to rabbitmq
const config = require('../config');
const bus = require('servicebus').bus({ url: config.servicebus.uri + "?heartbeat=60" });

function publishEvent(event) {
	bus.publish(event.type, event);
	return Promise.resolve();
}

module.exports = publishEvent;