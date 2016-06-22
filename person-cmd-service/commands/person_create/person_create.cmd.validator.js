const store = require('../../store/store');
const { unique, email, uuid, minLength, integer, createValidator } = require('validations');

const validateProposal = createValidator({
	_id: [unique, uuid],
	first_name: [minLength(1)],
	last_name: [minLength(1)],
	phone: [unique, integer],
	carrier: [minLength(1)],
	email: [email]
});

function validateProposalCreateCommand(payload) {
	return new Promise((resolve, reject) => {
		const { proposalAggregate } = store.getState();
		const proposal = payload;

		const errors = validateProposal(proposal, null, proposalAggregate);
		const isErrors = Object.keys(errors).length;



		if(isErrors) {
			return reject(errors);
		}
		console.log('VALIDATED COMMAND:', payload);
		return resolve(payload);
	});
}

module.exports = validateProposalCreateCommand;
