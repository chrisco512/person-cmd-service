const chai = require('chai');
const { expect } = chai;
const validatePersonPhoneChangeCommand = require('./person_phone_change.cmd.validator');
const { VALIDATION_ERROR } = require('../../error_types');

describe('validatePersonPhoneChangeCommand', () => {
	it('should reject a command without an id that is a valid uuid', () => {
		return validatePersonPhoneChangeCommand({
			phone: 7777777777
		})
		.then(personPhoneChanged => {
			expect(personPhoneChanged).to.equal(undefined);
		})
		.catch(err => {
			expect(err).to.be.an('object');
			expect(err.type).to.equal(VALIDATION_ERROR);
		});
	});
});
