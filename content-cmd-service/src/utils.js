'use strict';
const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const store = require('./store/store');
const log = require('./log');
const MongoHeartBeat = require('mongo-heartbeat');

let db;

module.exports = {
	rebuildMeetingsFromEvents,
	setupHandlers,
        db
};


function heartbeat(db) {
  let hb = MongoHeartBeat(db, {
    interval: 5000,
    timeout: 10000,
    tolerance: 2
  });

  hb.on('error', function(err) {
    conole.log("mongo is dead :(")
    process.exit(1)
  });
}

function *rebuildMeetingsFromEvents() {
	log.info('Rebuilding state from events...');
	let eventCounter = 0;

	let url = config.mongo.uri;
	db = yield MongoClient.connect(url);
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

        heartbeat(db);
}

function setupHandlers() {
	/* Quit Node Properly with Ctrl+C */
	process.on('SIGINT', function() {
		log.info('Gracefully shutting down from SIGINT (Ctrl+C)');
		process.exit();
	});
}
