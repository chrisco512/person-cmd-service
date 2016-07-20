const chai = require('chai');

const expect = chai.expect;
const personCarrierChanged = require('./person_carrier_changed.event.creator');
const { PERSON_CARRIER_CHANGED } = require('../event_types');

describe('personCarrierChanged', () => {
	it('should return an event with type PERSON_CARRIER_CHANGED', () => {
		return personCarrierChanged({})
		.then((personCarrierChangedEvent) => {
			expect(personCarrierChangedEvent.type).to.equal(PERSON_CARRIER_CHANGED);
		});
	});

	it('should add _id, carrier to the payload', () => {
		return personCarrierChanged({
			_id: '1',
			carrier: 'Verizon'
		})
		.then((personCarrierChangedEvent) => {
			expect(personCarrierChangedEvent.payload._id).to.equal('1');
			expect(personCarrierChangedEvent.payload.carrier).to.equal('Verizon');
		});
	});
});
