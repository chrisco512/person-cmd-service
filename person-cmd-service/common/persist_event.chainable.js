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
		console.log('about to save event: ', event);
		const newEvent = new Event(event);

		newEvent.save((err, persistedEvent) => {
			console.log('err: ', err);
			if(err) { reject(err); }

			console.log('saved event: ', persistedEvent);
			resolve(persistedEvent);
		});
	});
}

module.exports = persistEvent;