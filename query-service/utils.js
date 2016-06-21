'use strict';
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const store = require('./store/store');

module.exports = {
	rebuildQueryModelsFromEvents
};

function *rebuildQueryModelsFromEvents() {
	console.log('Rebuilding state from events...');
	let eventCounter = 0;

	let url = config.mongo.uri;
	console.log("Connecting to mongo", url);
	let db = yield MongoClient.connect(url);
	let eventCursor = db.collection('events').find();

	let startTime = new Date();
	let cursorCount = yield eventCursor.count();
	console.log(`starting mongo event reads with current cursor length - ${cursorCount}`);
	while(yield eventCursor.hasNext()) {
		try {
			let event = yield eventCursor.next();
			store.dispatch(event);
			eventCounter += 1;
			console.log(eventCounter);
		} catch(err) {
			console.log("mongo error", err);
			throw Error(err);
		}
	}

	let endTime = new Date();
	let processTime = endTime - startTime;
	console.log(`Processed ${eventCounter} events in ${processTime} ms.`);

	eventCursor.close();
	db.close();
}
