const { combineReducers } = require('redux');

const tenants = require('./tenants/tenants.reducer.js');
const employees = require('./employees/employees.reducer.js');
const persons = require('./persons/person.reducer.js');

const reducers = {
	tenants,
	employees,
	persons
};

module.exports = combineReducers(reducers);
