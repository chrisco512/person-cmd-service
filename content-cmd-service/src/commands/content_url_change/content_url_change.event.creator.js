const { CONTENT_URL_CHANGED } = require('../event_types');
const log = require('../../log');

function contentUrlChanged({ data, index }) {
	log.info(CONTENT_URL_CHANGED, ' : ', { data, index });
	return Promise.resolve({
		type: CONTENT_URL_CHANGED,
		payload: {
			data,
			index
		}
	});
}

module.exports = contentUrlChanged;
