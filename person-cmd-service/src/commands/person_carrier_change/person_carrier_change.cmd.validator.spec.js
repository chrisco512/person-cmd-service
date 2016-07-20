const chai = require('chai');
const { expect } = chai;
const validatePersonCarrierChangeCommand = require('./person_carrier_change.cmd.validator');
const { VALIDATION_ERROR } = require('../../error_types');

describe('validatePersonCarrierChangeCommand', () => {
	it('should reject a command without an id that is a valid uuid', () => {
		return validatePersonCarrierChangeCommand({
			carrier: "Verizon"
		})
		.then(personCarrierChanged => {
			expect(personCarrierChanged).to.equal(undefined);
		})
		.catch(err => {
			expect(err).to.be.an('object');
			expect(err.type).to.equal(VALIDATION_ERROR);
		});
	});
});
