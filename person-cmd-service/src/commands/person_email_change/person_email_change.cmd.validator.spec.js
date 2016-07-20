const chai = require('chai');
const { expect } = chai;
const validatePersonEmailChangeCommand = require('./person_email_change.cmd.validator');
const { VALIDATION_ERROR } = require('../../error_types');

describe('validatePersonEmailChangeCommand', () => {
	it('should reject a command without an id that is a valid uuid', () => {
		return validatePersonEmailChangeCommand({
			email: 'chris@gmail.com'
		})
		.then(personEmailChanged => {
			expect(personEmailChanged).to.equal(undefined);
		})
		.catch(err => {
			expect(err).to.be.an('object');
			expect(err.type).to.equal(VALIDATION_ERROR);
		});
	});
});
