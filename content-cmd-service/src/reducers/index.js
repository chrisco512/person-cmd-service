const { combineReducers } = require('redux');

const contents = require('./contents/contents.reducer.js');

const reducers = {
	contents
};

module.exports = combineReducers(reducers);
