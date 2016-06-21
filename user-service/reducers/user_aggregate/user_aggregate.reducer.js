const _ = require('lodash');
const {
	USER_CREATED
} = require('../../commands/event_types');

function reducer(users = [], action ) {
	console.log("In user reducer - ", action);
	switch(action.type) {
		case USER_CREATED:
			return userCreated(users, action.payload);
	}
	return users;
}

function userCreated(users, payload) {
	console.log("Making user with action - ", USER_CREATED);
	return [...users, payload];
}

module.exports = reducer;
