//Will be in charge of persisting to mongo
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const config = require('../config');
const uri = config.mongo.uri;

mongoose.connect(uri);

const EventSchema = new Schema({
	type      : String,
	payload   : {}
});

const Event = mongoose.model('Event', EventSchema);

function persistEvent(event) {
	return new Promise((resolve, reject) => {
		const newEvent = new Event(event);

		newEvent.save((err, persistedEvent) => {
			if(err) { reject(err); }

			resolve(persistedEvent);
		});
	});
}

module.exports = persistEvent;