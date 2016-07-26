const log = require('loglevel');
const loglevelMessagePrefix = require('loglevel-message-prefix');

loglevelMessagePrefix(log);

/*
	trace
	debug
	info
	warn
	error
*/

if(process.env.NODE_ENV === 'development') {
	log.setLevel('info');
} else {
	log.setLevel('error');
}

module.exports = log;
