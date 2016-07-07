const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

chai.use(sinonChai);

const personsReducer = require('./persons.reducer');
const { PERSON_CREATED } = require('../../commands/event_types');

describe('persons.reducer', () => {
	describe('personCreated', () => {
		it('should return a new persons collection with new person added', () => {

			let personCreatedEvent = {
				type: PERSON_CREATED,
				payload: {
					_id: '123'
				}
			};

			let persons = personsReducer([], personCreatedEvent);

			expect(persons.length).to.equal(1);
			expect(persons[0]._id).to.equal('123');

		});
	});
});