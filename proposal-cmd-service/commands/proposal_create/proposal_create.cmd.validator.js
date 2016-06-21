const _ = require('lodash');
const store = require('../../store/store');
const { unique, minLength, createValidator } = require('validations');

const validateProposal = createValidator({
	_id: [unique],
	name: [minLength(1)]
});

function validateProposalCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { proposalAggregate } = store.getState();
		const proposal = payload;

		const errors = validateProposal(proposal, proposalAggregate);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			return reject(errors);
		}
		console.log('VALIDATED COMMAND:', payload);
		return resolve(payload);
	});
}

module.exports = validateProposalCreateCommand;
