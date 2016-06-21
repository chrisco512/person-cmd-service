const { expect } = require('chai');

const { PRODUCT_COMPLETED } = require('../event_types');
const eventCreator = require('./product_completed.event.creator');

describe('product_completed.event.creator', () => {
	describe('given an object with an _id property', () => {
		it('should return a product_completed event with the _id in the payload and type on the event', (done) => {
			let eventPromise = eventCreator({ _id: '1' });

			eventPromise
				.then((event) => {
					expect(event.payload._id).to.equal('1');
					expect(event.type).to.equal(PRODUCT_COMPLETED);
					done();
				})
				.catch(done)
		});
	});
});