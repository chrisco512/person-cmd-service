//Will be in charge of publishing to rabbitmq
const config = require('../config');
const bus = require('servicebus').bus({ url: `${config.servicebus.uri}?heartbeat=60` });

function publishEvent(event) {
	bus.publish(event.type, event);
	return Promise.resolve(event);
}

module.exports = publishEvent;
