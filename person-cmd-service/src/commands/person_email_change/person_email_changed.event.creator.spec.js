const chai = require('chai');

const expect = chai.expect;
const personEmailChanged = require('./person_email_changed.event.creator');
const { PERSON_EMAIL_CHANGED } = require('../event_types');

describe('personEmailChanged', () => {
	it('should return an event with type PERSON_EMAIL_CHANGED', () => {
		return personEmailChanged({})
		.then((personEmailChangedEvent) => {
			expect(personEmailChangedEvent.type).to.equal(PERSON_EMAIL_CHANGED);
		});
	});

	it('should add _id, email to the payload', () => {
		return personEmailChanged({
			_id: '1',
			email: 'chris@gmail.com'
		})
		.then((personEmailChangedEvent) => {
			expect(personEmailChangedEvent.payload._id).to.equal('1');
			expect(personEmailChangedEvent.payload.email).to.equal('chris@gmail.com');
		});
	});
});
