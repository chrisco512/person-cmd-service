const chai = require('chai');
const {
  expect
} = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

chai.use(sinonChai);

describe('dispatchEvent', () => {
  it('should call store.dispatch with the event passed in', () => {
    const dispatch = sinon.spy();
    const stubs = {
      './../store': {
        dispatch
      }
    };

    const dispatchEvent = proxyquire('./dispatch_event.chainable', stubs);
    const event = {
      type: 'test'
    };

    dispatchEvent(event);

    expect(dispatch).to.have.been.calledWith(event);
  });
});
