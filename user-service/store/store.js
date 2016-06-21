const { applyMiddleware, createStore } = require('redux');
const reducer = require('../reducers');

const store = createStore(
	reducer
);

module.exports = store;
