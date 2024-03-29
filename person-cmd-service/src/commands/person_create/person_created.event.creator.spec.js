const chai = require('chai');

const expect = chai.expect;
const personCreated = require('./person_created.event.creator');
const { PERSON_CREATED } = require('../event_types');

describe('personCreated', () => {
	it('should return an event with type PERSON_CREATED', () => {
		return personCreated({})
		.then((personCreatedEvent) => {
			expect(personCreatedEvent.type).to.equal(PERSON_CREATED);
		});
	});

	it('should add _id, firstName, lastName, phone, carrier to the payload', () => {
		return personCreated({
			_id: '1',
			firstName: 'chris',
			lastName: 'cordle',
			phone: 5,
			carrier: 'att'
		})
		.then((personCreatedEvent) => {
			expect(personCreatedEvent.payload._id).to.equal('1');
			expect(personCreatedEvent.payload.firstName).to.equal('chris');
			expect(personCreatedEvent.payload.lastName).to.equal('cordle');
			expect(personCreatedEvent.payload.phone).to.equal(5);
			expect(personCreatedEvent.payload.carrier).to.equal('att');
		});
	});
});
