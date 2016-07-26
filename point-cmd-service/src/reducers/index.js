const { combineReducers } = require('redux');

const points = require('./points/points.reducer.js');

const reducers = {
	points
};

module.exports = combineReducers(reducers);
