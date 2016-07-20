const chai = require('chai');
const { expect } = chai;
const validatePersonLastNameChangeCommand = require('./person_last_name_change.cmd.validator');
const { VALIDATION_ERROR } = require('../../error_types');

describe('validatePersonLastNameChangeCommand', () => {
	it('should reject a command without an id that is a valid uuid', () => {
		return validatePersonLastNameChangeCommand({
			lastName: 'chris'
		})
		.then(personLastNameChanged => {
			expect(personLastNameChanged).to.equal(undefined);
		})
		.catch(err => {
			expect(err).to.be.an('object');
			expect(err.type).to.equal(VALIDATION_ERROR);
		});
	});
});
