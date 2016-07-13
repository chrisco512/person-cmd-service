const chai = require('chai');
const { expect } = chai;
const validatePersonCreateCommand = require('./person_create.cmd.validator');
const { VALIDATION_ERROR } = require('../../error_types');

describe('validatePersonCreateCommand', () => {
	it('should reject a command without an id that is a valid uuid', () => {
		return validatePersonCreateCommand({
			firstName: 'chris',
			lastName: 'cordle',
			phone: 342,
			email: 'chris@cordle.com'
		})
		.then(personCreated => {
			expect(personCreated).to.equal(undefined);
		})
		.catch(err => {
			expect(err).to.be.an('object');
			expect(err.type).to.equal(VALIDATION_ERROR);
		});
	});
});
