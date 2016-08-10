const { CONTENT_QUOTE_CHANGED } = require('../event_types');
const log = require('../../log');

function contentQuoteChanged({ data, index }) {
	log.info(CONTENT_QUOTE_CHANGED, ' : ', { data, index });
	return Promise.resolve({
		type: CONTENT_QUOTE_CHANGED,
		payload: {
			data,
			index
		}
	});
}

module.exports = contentQuoteChanged;
