const { CONTENT_AUTHOR_CHANGED } = require('../event_types');
const log = require('../../log');

function contentAuthorChanged({ data, index }) {
	log.info(CONTENT_AUTHOR_CHANGED, ' : ', { data, index });
	return Promise.resolve({
		type: CONTENT_AUTHOR_CHANGED,
		payload: {
			data,
			index
		}
	});
}

module.exports = contentAuthorChanged;
