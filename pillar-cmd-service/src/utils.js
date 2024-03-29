'use strict';
const store = require('./store');
const log = require('./log');
const MongoSingle = require('./mongo_single.js');
const MongoHeartbeat = require('mongo-heartbeat');

module.exports = {
	rebuildMeetingsFromEvents,
        setupHandlers,
        setupHeartbeat
};

function setupHeartbeat() {
	MongoSingle
		.connect()
		.then((db) => {
			const hb = MongoHeartbeat(db, {
				interval: 5000,
				timeout: 10000,
				tolerance: 2
			});

			hb.on('error', function() {
				log.error('mongo is dead :(');
				process.exit(1);
			});
		});
}

function* rebuildMeetingsFromEvents() {
	log.info('Rebuilding state from events...');
	let eventCounter = 0;

	const db = yield MongoSingle.connect();
	const eventCursor = db.collection('events').find();

	const startTime = new Date();

	while(yield eventCursor.hasNext()) {
		try {
			const event = yield eventCursor.next();
			store.dispatch(event);
			eventCounter += 1;
		} catch(err) {
			throw Error(err);
		}
	}

	const endTime = new Date();
	const processTime = endTime - startTime;
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
