const {
	CONTENT_CREATED,
	CONTENT_DELETED,
	CONTENT_TITLE_CHANGED,
	CONTENT_URL_CHANGED,
	CONTENT_QUOTE_CHANGED,
	CONTENT_AUTHOR_CHANGED,
	CONTENT_RECIPIENT_CHANGED,
	CONTENT_RECIPIENT_POSITION_CHANGED,
	CONTENT_DESCRIPTION_CHANGED
} = require('../../commands/event_types');
const log = require('../../log');
const _ = require('lodash');

function reducer(contents = [], action ) {
	log.info('IN CONTENT REDUCER 👷');
	switch(action.type) {
		case CONTENT_CREATED:
			return contentCreated(contents, action.payload);
		case CONTENT_DELETED:
			return contentDeleted(contents, action.payload);
		case CONTENT_TITLE_CHANGED:
			return contentDataChanged(contents, action.payload.index, action.payload.data.title, 'title');
		case CONTENT_URL_CHANGED:
			return contentDataChanged(contents, action.payload.index, action.payload.data.url, 'url');
		case CONTENT_QUOTE_CHANGED:
			return contentDataChanged(contents, action.payload.index, action.payload.data.quote, 'quote');
		case CONTENT_AUTHOR_CHANGED:
			return contentDataChanged(contents, action.payload.index, action.payload.data.author, 'author');
		case CONTENT_RECIPIENT_CHANGED:
			return contentDataChanged(contents, action.payload.index, action.payload.data.recipient, 'recipient');
		case CONTENT_RECIPIENT_POSITION_CHANGED:
			return contentDataChanged(contents, action.payload.index, action.payload.data.recipientPosition, 'recipientPosition');
		case CONTENT_DESCRIPTION_CHANGED:
			return contentDataChanged(contents, action.payload.index, action.payload.data.description, 'description');
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

function contentDataChanged(contents, index, payloadDataType, keyType) {
	const newContent = Object.assign({}, contents[index], {
		data: Object.assign({}, contents[index].data, {
			[keyType]: payloadDataType
		})
	});
	return [
		...contents.slice(0, index),
		newContent,
		...contents.slice(index + 1)
	];
}

module.exports = reducer;
