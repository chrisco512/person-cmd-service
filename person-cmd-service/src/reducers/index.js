const { combineReducers } = require('redux');

const persons = require('./persons/persons.reducer.js');

const reducers = {
	persons
};

module.exports = combineReducers(reducers);
