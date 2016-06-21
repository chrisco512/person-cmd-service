const util = require('util');
const _ = require('lodash');
const store = require('../../store/store');
const { createValidator, unique, valueExistsInCollection, uuid, isString } = require('validations');

const validateProduct = createValidator({
	_id: [unique] //[unique, uuid
});

const validateProposal = createValidator({
	_id: [valueExistsInCollection]
});

function validateProductStartCommand(payload) {
	return new Promise((resolve, reject) => {
		const { productAggregate, proposals } = store.getState();
		const product = payload;

		console.log('proposals: ', util.inspect(proposals[0]));

		const productErrors = validateProduct(product, productAggregate);
		const proposalIdFieldErrors = validateProposal({ _id: product.proposal_id }, proposals);

		console.log('proposalIdFieldErrors: ', util.inspect(proposalIdFieldErrors));

		if(proposalIdFieldErrors._id) {
			productErrors.proposal_id = proposalIdFieldErrors._id;
		}

		console.log('errors: ', util.inspect(productErrors));

		const isErrors = Object.keys(productErrors).length;

		if(isErrors) {
			reject(productErrors);
		}
		console.log('VALIDATED COMMAND:', payload);
		resolve(payload);
	});
}

module.exports = validateProductStartCommand;
