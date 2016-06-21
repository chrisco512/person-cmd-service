const _ = require('lodash');
const store = require('../../store/store');
const { createValidator, notOneOf, valueExistsInCollection } = require('validations');

const validateProduct = createValidator({
	_id: [valueExistsInCollection],
	status: [notOneOf(['completed'])]
});

function validateProductImproveCommand(payload) {
	return new Promise((resolve, reject) => {
		const { _id } = payload;
		const { productAggregate } = store.getState();
		const product = _.find(productAggregate, {_id });

		const errors = validateProduct(product, productAggregate);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject(errors);
		}

		console.log('VALIDATED COMMAND PRODUCT IMPROVE:', payload);
		resolve(payload);
	});
}

module.exports = validateProductImproveCommand;
