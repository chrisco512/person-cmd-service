const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

chai.use(sinonChai);

const pillarsReducer = require('./pillars.reducer');
const { PILLAR_CREATED } = require('../../commands/event_types');

describe('pillars.reducer', () => {
	describe('pillarCreated', () => {
		it('should return a new pillars collection with new pillar added', () => {

			let pillarCreatedEvent = {
				type: PILLAR_CREATED,
				payload: {
					_id: '123'
				}
			};

			let pillars = pillarsReducer([], pillarCreatedEvent);

			expect(pillars.length).to.equal(1);
			expect(pillars[0]._id).to.equal('123');

		});
	});
});