const { combineReducers } = require('redux');

const personAggregate = require('./person_aggregate/person_aggregate.reducer.js');

const reducers = {
	personAggregate,
};

module.exports = combineReducers(reducers);