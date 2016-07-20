const chai = require('chai');

const expect = chai.expect;
const personLastNameChanged = require('./person_last_name_changed.event.creator');
const { PERSON_LAST_NAME_CHANGED } = require('../event_types');

describe('personLastNameChanged', () => {
	it('should return an event with type PERSON_LAST_NAME_CHANGED', () => {
		return personLastNameChanged({})
		.then((personLastNameChangedEvent) => {
			expect(personLastNameChangedEvent.type).to.equal(PERSON_LAST_NAME_CHANGED);
		});
	});

	it('should add _id, lastName to the payload', () => {
		return personLastNameChanged({
			_id: '1',
			lastName: 'chris'
		})
		.then((personLastNameChangedEvent) => {
			expect(personLastNameChangedEvent.payload._id).to.equal('1');
			expect(personLastNameChangedEvent.payload.lastName).to.equal('chris');
		});
	});
});
