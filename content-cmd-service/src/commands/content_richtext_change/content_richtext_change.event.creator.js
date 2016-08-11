const { CONTENT_RICHTEXT_CHANGED } = require('../event_types');
const log = require('../../log');

function contentRichtextChanged({ data, index }) {
	log.info(CONTENT_RICHTEXT_CHANGED, ' : ', { data, index });
	return Promise.resolve({
		type: CONTENT_RICHTEXT_CHANGED,
		payload: {
			data,
			index
		}
	});
}

module.exports = contentRichtextChanged;
