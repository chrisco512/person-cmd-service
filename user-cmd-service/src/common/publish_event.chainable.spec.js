const chai = require('chai');
const {
  expect
} = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

chai.use(sinonChai);

describe('publishEvent', () => {
  it('should call bus.publish with the event passed in', () => {
    const publish = sinon.spy();
    const stubs = {
      'servicebus': {
        bus() {
          return {
            publish
          };
        }
      }
    };

    const publishEvent = proxyquire('./publish_event.chainable', stubs);
    const event = {
      type: 'test'
    };

    publishEvent(event);

    expect(publish).to.have.been.calledWith('test', event);
  });
});
