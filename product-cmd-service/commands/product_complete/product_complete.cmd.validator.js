const _ = require('lodash');
const store = require('../../store/store');
const { createValidator, notOneOf, valueExistsInCollection, atLeast } = require('validations');

const validateProduct = createValidator({
	_id: [valueExistsInCollection],
	improvements: [atLeast(1)],
	status: [notOneOf(['completed'])]
});

function validateProductCompleteCommand(payload) {
	return new Promise((resolve, reject) => {
		const { _id } = payload;
		const { productAggregate } = store.getState();
		const product = _.find(productAggregate, {_id });

		const errors = validateProduct(product, productAggregate);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject(errors);
		}
		console.log('VALIDATED COMMAND:', payload);
		resolve(payload);
	});
}

module.exports = validateProductCompleteCommand;
