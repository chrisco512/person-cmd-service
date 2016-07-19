const {
	CONTENT_CREATED,
	CONTENT_DELETED
} = require('../../commands/event_types');
const log = require('../../log');
const _ = require('lodash');

function reducer(contents = [], action ) {
	log.debug('IN CONTENT REDUCER 👷');
	switch(action.type) {
		case CONTENT_CREATED:
			return contentCreated(contents, action.payload);
		case CONTENT_DELETED:
			return contentDeleted(contents, action.payload);
		default:
			return contents;
	}
}

function contentCreated(contents, payload) {
	return [...contents, payload];
}

function contentDeleted(contents, payload) {
	const contentIndex = _.findIndex(contents, function(i) {
		return i._id === payload._id;
	});
	const newContent = Object.assign({}, contents[contentIndex], {
		 isDeleted: true
	});
	return [
		...contents.slice(0, contentIndex),
		newContent,
		...contents.slice(contentIndex + 1)
	];
}

module.exports = reducer;
