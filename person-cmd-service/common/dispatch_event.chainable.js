const store = require('./../store/store');

function dispatchEvent(event) {
	console.log('ABOUT TO DISPATCH', event);
	store.dispatch(event);
	return Promise.resolve(event);
}

module.exports = dispatchEvent;