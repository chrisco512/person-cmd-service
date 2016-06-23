'use strict';
const config = require('./config');
const log = require('./log');

module.exports = {
	setupHandlers
};

function setupHandlers() {
	/* Quit Node Properly with Ctrl+C */
	process.on('SIGINT', function() {
		log.info('Gracefully shutting down from SIGINT (Ctrl+C)');
		process.exit();
	});
}
