const { combineReducers } = require('redux');

const productAggregate = require('./product_aggregate/product_aggregate.reducer.js');
const proposals = require('./proposals/proposal.reducer.js');

const reducers = {
	productAggregate,
	proposals
};

module.exports = combineReducers(reducers);