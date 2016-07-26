const { combineReducers } = require('redux');

const tenants = require('./tenants/tenants.reducer');
const employees = require('./employees/employees.reducer');
const persons = require('./persons/person.reducer');
const pillars = require('./pillars/pillar.reducer');
const users = require('./users/user.reducer');
const points = require('./points/points.reducer');

const reducers = {
	tenants,
	employees,
	persons,
  pillars,
  users,
	points
};

module.exports = combineReducers(reducers);
