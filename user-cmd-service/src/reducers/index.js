const {
  combineReducers
} = require('redux');

const users = require('./users/users.reducer.js');
const tenants = require('./tenants/tenants.reducer.js');
const people = require('./people/people.reducer.js');

const reducers = {
  users,
  tenants,
  people
};

module.exports = combineReducers(reducers);
