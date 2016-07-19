const store = require('./../store/store');

function dispatchEvent(event) {
	store.dispatch(event);
	return Promise.resolve(event);
}

module.exports = dispatchEvent;
