const chai = require('chai');

const expect = chai.expect;
const personPhoneChanged = require('./person_phone_changed.event.creator');
const { PERSON_PHONE_CHANGED } = require('../event_types');

describe('personPhoneChanged', () => {
	it('should return an event with type PERSON_PHONE_CHANGED', () => {
		return personPhoneChanged({})
		.then((personPhoneChangedEvent) => {
			expect(personPhoneChangedEvent.type).to.equal(PERSON_PHONE_CHANGED);
		});
	});

	it('should add _id, phone to the payload', () => {
		return personPhoneChanged({
			_id: '1',
			phone: 7777777777
		})
		.then((personPhoneChangedEvent) => {
			expect(personPhoneChangedEvent.payload._id).to.equal('1');
			expect(personPhoneChangedEvent.payload.phone).to.equal(7777777777);
		});
	});
});
