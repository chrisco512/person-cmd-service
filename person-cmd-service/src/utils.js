'use strict';
const config = require('./config');
const MongoSingle = require('./mongo_single');
const MongoHeartbeat = require('mongo-heartbeat');
const store = require('./store');
const log = require('./log');

module.exports = {
	rebuildMeetingsFromEvents,
  setupHandlers,
	setupHeartbeat
};

function setupHeartbeat() {
	MongoSingle
		.connect()
		.then((db) => {
			let hb = MongoHeartbeat(db, {
				interval: 5000,
				timeout: 10000,
				tolerance: 2
			});

			hb.on('error', function() {
				log.error('mongo is dead :(');
				process.exit(1)
			});
		});
}

function *rebuildMeetingsFromEvents() {
	log.info('Rebuilding state from events...');
	let eventCounter = 0;

	let db = yield MongoSingle.connect();
	let eventCursor = db.collection('events').find();

	let startTime = new Date();

	while(yield eventCursor.hasNext()) {
		try {
			let event = yield eventCursor.next();
			store.dispatch(event);
			eventCounter += 1;
		} catch(err) {
			throw Error(err);
		}
	}

	let endTime = new Date();
	let processTime = endTime - startTime;
	log.info(`Processed ${eventCounter} events in ${processTime} ms.`);

	eventCursor.close();
}

function setupHandlers() {
	/* Quit Node Properly with Ctrl+C */
	process.on('SIGINT', function() {
		log.info('Gracefully shutting down from SIGINT (Ctrl+C)');
		process.exit();
	});
}
