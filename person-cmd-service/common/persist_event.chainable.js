//Will be in charge of persisting to mongo
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const config = require('../config');
const uri = config.mongo.uri;
const log = require('../log');
const { SERVER_ERROR } = require('../errorTypes');

mongoose.connect(uri);

const EventSchema = new Schema({
	type      : String,
	payload   : {},
	created   : Date,
	userId    : String,
	tenantId  : String
});

const Event = mongoose.model('Event', EventSchema);

function persistEvent(event) {
	return new Promise((resolve, reject) => {
		const newEvent = new Event(event);

		newEvent.save((err, persistedEvent) => {
			if(err) {
				log.warn('ERROR PERSISTING EVENT: ', event);
				reject({ type: SERVER_ERROR, err });
			}

			resolve(persistedEvent);
		});
	});
}

module.exports = persistEvent;