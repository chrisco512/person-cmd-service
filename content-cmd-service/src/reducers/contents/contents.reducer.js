const {
	CONTENT_CREATED,
	CONTENT_DELETED
} = require('../../commands/event_types');
const log = require('../../log');

function reducer(contents = [], action ) {
	log.debug('IN REDUCER');

	switch(action.type) {
		case CONTENT_CREATED:
			return contentCreated(contents, action.payload);
	}
	return contents;
}

function contentCreated(contents, payload) {
	console.log('contents', contents);
	console.log('payload', payload);
	return [...contents, payload];
}

module.exports = reducer;
