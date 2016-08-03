const { CONTENT_TITLE_CHANGED } = require('../event_types');
const log = require('../../log');

function contentTitleChanged({ data, index }) {
	log.info(CONTENT_TITLE_CHANGED, ' : ', { data, index });
	return Promise.resolve({
		type: CONTENT_TITLE_CHANGED,
		payload: {
			data,
			index
		}
	});
}

module.exports = contentTitleChanged;
