const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();

chai.use(sinonChai);

const personsReducer = require('./persons.reducer');
const {
	PERSON_CREATED,
	PERSON_FIRST_NAME_CHANGED,
	PERSON_LAST_NAME_CHANGED,
	PERSON_EMAIL_CHANGED,
	PERSON_PHONE_CHANGED,
	PERSON_CARRIER_CHANGED
} = require('../../commands/event_types');

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
	describe('personFirstNameChanged', () => {
		it('should modify the first name of the person with the specified id', () => {

			let personFirstNameChangedEvent = {
				type: PERSON_FIRST_NAME_CHANGED,
				payload: {
					_id: '123',
					firstName: 'James'
				}
			};

			let state = [
				{
					_id: '456',
					firstName: 'Ben'
				},
				{
					_id: '123',
					firstName: 'Chris'
				}
			]

			let persons = personsReducer(state, personFirstNameChangedEvent);

			expect(persons.length).to.equal(2);
			expect(persons[1].firstName).to.equal('James');

		});
	});
	describe('personLastNameChanged', () => {
		it('should modify the last name of the person with the specified id', () => {

			let personLastNameChangedEvent = {
				type: PERSON_LAST_NAME_CHANGED,
				payload: {
					_id: '123',
					lastName: 'McLaughlin'
				}
			};

			let state = [
				{
					_id: '456',
					lastName: 'Botwin'
				},
				{
					_id: '123',
					lastName: 'Cordle'
				}
			]

			let persons = personsReducer(state, personLastNameChangedEvent);

			expect(persons.length).to.equal(2);
			expect(persons[1].lastName).to.equal('McLaughlin');

		});
	});
	describe('personEmailChanged', () => {
		it('should modify the email of the person with the specified id', () => {

			let personEmailChangedEvent = {
				type: PERSON_EMAIL_CHANGED,
				payload: {
					_id: '123',
					email: 'test@gmail.com'
				}
			};

			let state = [
				{
					_id: '456',
					email: 'first@gmail.com'
				},
				{
					_id: '123',
					email: 'second@gmail.com'
				}
			]

			let persons = personsReducer(state, personEmailChangedEvent);

			expect(persons.length).to.equal(2);
			expect(persons[1].email).to.equal('test@gmail.com');

		});
	});
	describe('personPhoneChanged', () => {
		it('should modify the phone number of the person with the specified id', () => {

			let personPhoneChangedEvent = {
				type: PERSON_PHONE_CHANGED,
				payload: {
					_id: '123',
					phone: 7777777777
				}
			};

			let state = [
				{
					_id: '456',
					phone: 1111111111
				},
				{
					_id: '123',
					phone: 2222222222
				}
			]

			let persons = personsReducer(state, personPhoneChangedEvent);

			expect(persons.length).to.equal(2);
			expect(persons[1].phone).to.equal(7777777777);

		});
	});
	describe('personCarrierChanged', () => {
		it('should modify the carrier of the person with the specified id', () => {

			let personCarrierChangedEvent = {
				type: PERSON_CARRIER_CHANGED,
				payload: {
					_id: '123',
					carrier: 'Sprint'
				}
			};

			let state = [
				{
					_id: '456',
					carrier: 'Verizon'
				},
				{
					_id: '123',
					carrier: 'Cricket'
				}
			]

			let persons = personsReducer(state, personCarrierChangedEvent);

			expect(persons.length).to.equal(2);
			expect(persons[1].carrier).to.equal('Sprint');

		});
	});
});
