const { combineReducers } = require('redux');

const tenants = require('./tenants/tenants.reducer.js');
const employees = require('./employees/employees.reducer.js');
const products = require('./products/products.reducer.js');
const proposals = require('./proposals/proposal.reducer.js');
const persons = require('./persons/person.reducer.js');

const reducers = {
	tenants,
	employees,
	products,
	proposals,
        persons
};

module.exports = combineReducers(reducers);
