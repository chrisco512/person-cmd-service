const { combineReducers } = require('redux');

const proposalAggregate = require('./proposal_aggregate/proposal_aggregate.reducer.js');

const reducers = {
	proposalAggregate,
};

module.exports = combineReducers(reducers);