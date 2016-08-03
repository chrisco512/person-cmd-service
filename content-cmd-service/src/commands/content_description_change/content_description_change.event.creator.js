const { CONTENT_DESCRIPTION_CHANGED } = require('../event_types');
const log = require('../../log');

function contentTitleChanged({ data, index }) {
	log.info(CONTENT_DESCRIPTION_CHANGED, ' : ', { data, index });
	return Promise.resolve({
		type: CONTENT_DESCRIPTION_CHANGED,
		payload: {
			data,
			index
		}
	});
}

module.exports = contentTitleChanged;
