const {
	CONTENT_CREATED,
	CONTENT_DELETED,
	CONTENT_TITLE_CHANGED,
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
			return contentTitleChanged(contents, action.payload);
		case CONTENT_DESCRIPTION_CHANGED:
			return contentDescriptionChanged(contents, action.payload);
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

function contentTitleChanged(contents, payload) {
	const { index } = payload;
	const contentTitle = payload.data.title;
	const newContent = Object.assign({}, contents[index], {
		data: Object.assign({}, contents[index].data, {
			title: contentTitle
		})
	});
	return [
		...contents.slice(0, index),
		newContent,
		...contents.slice(index + 1)
	];
}

function contentDescriptionChanged(contents, payload) {
	const { index } = payload;
	const contentDescription = payload.data.description;
	const newContent = Object.assign({}, contents[index], {
		data: Object.assign({}, contents[index].data, {
			description: contentDescription
		})
	});
	return [
		...contents.slice(0, index),
		newContent,
		...contents.slice(index + 1)
	];
}

module.exports = reducer;
