'use strict';
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const store = require('./store');

module.exports = {
	rebuildQueryModelsFromEvents,
	setupHandlers
};

function* rebuildQueryModelsFromEvents() {
	console.log('Rebuilding state from events...');
	let eventCounter = 0;

	const url = config.mongo.uri;
	console.log('Connecting to mongo', url);
	const db = yield MongoClient.connect(url);
	const eventCursor = db.collection('events').find();

	const startTime = new Date();
	const cursorCount = yield eventCursor.count();
	console.log(`starting mongo event reads with current cursor length - ${cursorCount}`);
	while(yield eventCursor.hasNext()) {
		try {
			const event = yield eventCursor.next();
			store.dispatch(event);
			eventCounter += 1;
			console.log(eventCounter);
		} catch(err) {
			console.log('mongo error', err);
			throw Error(err);
		}
	}

	const endTime = new Date();
	const processTime = endTime - startTime;
	console.log(`Processed ${eventCounter} events in ${processTime} ms.`);

	eventCursor.close();
	db.close();
}

function setupHandlers() {
    // Quit Node Properly with Ctrl+C
    process.on('SIGINT', function() {
        console.log('Gracefully shutting down from SIGINT (Ctrl+C)');
        process.exit();
    });
}
