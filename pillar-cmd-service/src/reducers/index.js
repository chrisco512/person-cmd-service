const { combineReducers } = require('redux');

const pillars = require('./pillars/pillars.reducer.js');

const reducers = {
	pillars
};

module.exports = combineReducers(reducers);
