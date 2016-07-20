const chai = require('chai');
const { expect } = chai;
const validatePersonFirstNameChangeCommand = require('./person_first_name_change.cmd.validator');
const { VALIDATION_ERROR } = require('../../error_types');

describe('validatePersonFirstNameChangeCommand', () => {
	it('should reject a command without an id that is a valid uuid', () => {
		return validatePersonFirstNameChangeCommand({
			firstName: 'chris'
		})
		.then(personFirstNameChanged => {
			expect(personFirstNameChanged).to.equal(undefined);
		})
		.catch(err => {
			expect(err).to.be.an('object');
			expect(err.type).to.equal(VALIDATION_ERROR);
		});
	});
});
