const log = require('loglevel');
const loglevelMessagePrefix = require('loglevel-message-prefix');

loglevelMessagePrefix(log);

if(process.env.NODE_ENV === 'development') {
	log.setLevel('info');
}

log.setLevel('info');

module.exports = log;