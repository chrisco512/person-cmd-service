const _ = require('lodash');
const store = require('../../store');
const { contains, createValidator, required, minLength, integer, email, uuid, valueExistsInCollection } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validateCommand = createValidator({
	userId: [required],
	roles: [contains('manager')]
}, {
	userId: {
		primary: '_id',
		collection: 'users'
	}
});

function validateAddManagerCommand(payload) {
	return new Promise((resolve, reject) => {
		const { users } = store.getState();

		const user = users.filter((elm) => {
			return elm._id === payload.managerId;
		});

		if (user.length < 1) {
			return reject({type: VALIDATION_ERROR, errors: {managerId: 'Invalid User Id'}});
		}

		const errors = validateCommand(user[0], null, {users});

		const isErrors = Object.keys(errors).length;

		if (isErrors) {
			return reject({type: VALIDATION_ERROR, errors});
		}

		console.log('asfasdf');

		resolve(payload);
	});
}

module.exports = validateAddManagerCommand;
