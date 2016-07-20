const chai = require('chai');

const expect = chai.expect;
const personFirstNameChanged = require('./person_first_name_changed.event.creator');
const { PERSON_FIRST_NAME_CHANGED } = require('../event_types');

describe('personFirstNameChanged', () => {
	it('should return an event with type PERSON_FIRST_NAME_CHANGED', () => {
		return personFirstNameChanged({})
		.then((personFirstNameChangedEvent) => {
			expect(personFirstNameChangedEvent.type).to.equal(PERSON_FIRST_NAME_CHANGED);
		});
	});

	it('should add _id, firstName to the payload', () => {
		return personFirstNameChanged({
			_id: '1',
			firstName: 'chris'
		})
		.then((personFirstNameChangedEvent) => {
			expect(personFirstNameChangedEvent.payload._id).to.equal('1');
			expect(personFirstNameChangedEvent.payload.firstName).to.equal('chris');
		});
	});
});
