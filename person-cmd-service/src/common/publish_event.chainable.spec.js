const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

chai.use(sinonChai);

describe('publishEvent', () => {
	it('should call bus.publish with the event passed in', () => {
		let publish = sinon.spy();
		let stubs = {
			'servicebus': {
				bus: function() {
					return {
						publish
					}
				}
			}
		};

		let publishEvent = proxyquire('./publish_event.chainable', stubs);
		let event = { type: 'test' };

		publishEvent(event);

		expect(publish).to.have.been.calledWith('test', event);
	});
});