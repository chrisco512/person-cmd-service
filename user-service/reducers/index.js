const { combineReducers } = require('redux');

const userAggregate = require('./user_aggregate/user_aggregate.reducer.js');

const reducers = {
	userAggregate,
};

module.exports = combineReducers(reducers);
