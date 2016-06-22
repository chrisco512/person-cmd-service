const { combineReducers } = require('redux');

const tenantAggregate = require('./tenant_aggregate/tenant_aggregate.reducer.js');

const reducers = {
	tenantAggregate,
};

module.exports = combineReducers(reducers);