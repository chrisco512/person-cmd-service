const { combineReducers } = require('redux');

const userAggregate = require('./user_aggregate/user_aggregate.reducer.js');
const tenants = require('./tenants/tenants.reducer.js');
const people = require('./people/people.reducer.js');

const reducers = {
	userAggregate,
	tenants,
	people
};

module.exports = combineReducers(reducers);
