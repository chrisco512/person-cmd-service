const store = require('../store');

function dispatchEvent(event) {
	console.log('ABOUT TO DISPATCH', event);
	store.dispatch(event);
	return event;
}

module.exports = dispatchEvent;
