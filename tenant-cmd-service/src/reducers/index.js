const { combineReducers } = require('redux');

const tenants = require('./tenants/tenants.reducer.js');

const reducers = {
	tenants
};

module.exports = combineReducers(reducers);
