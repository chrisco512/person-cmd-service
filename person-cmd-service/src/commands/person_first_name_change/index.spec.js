const chai = require('chai');
const { expect } = chai;
const proxyquire = require('proxyquire').noCallThru();

describe('personFirstNameChangeCommandHandler', () => {
	it('should call methods in established order: validate, createEvent, dispatch, persist, publish', () => {
		let callCounter = 0;

		const personFirstNameChangeCommandHandler = proxyquire('./index', {
			'./person_first_name_change.cmd.validator': () => {
				expect(callCounter).to.equal(0);

				if(callCounter === 0) {
					callCounter++;
					return Promise.resolve();
				}
				return Promise.reject({});
			},
			'./person_first_name_changed.event.creator': () => {
				expect(callCounter).to.equal(1);

				if(callCounter === 1) {
					callCounter++;
					return Promise.resolve();
				}
				return Promise.reject({});
			},
			'../../common/dispatch_event.chainable': () => {
				expect(callCounter).to.equal(2);

				if(callCounter === 2) {
					callCounter++;
					return Promise.resolve();
				}
				return Promise.reject({});
			},
			'../../common/persist_event.chainable': () => {
				expect(callCounter).to.equal(3);

				if(callCounter === 3) {
					callCounter++;
					return Promise.resolve();
				}
				return Promise.reject({});
			},
			'../../common/publish_event.chainable': () => {
				expect(callCounter).to.equal(4);

				if(callCounter === 4) {
					callCounter++;
					return Promise.resolve();
				}
				return Promise.reject({});
			},
			'node-uuid': {
				v4: () => undefined
			},
			'../../log': () => null
		});

		return personFirstNameChangeCommandHandler({})
			.catch(err => {
				expect(err).to.equal(undefined);
			});
	});

	it('should throw an error when a validation fails', () => {
		const personFirstNameChangeCommandHandler = proxyquire('./index', {
			'./person_first_name_change.cmd.validator': () => {
				return Promise.reject({ err: 'ERROR' });
			},
			'./person_first_name_changed.event.creator': () => null,
			'../../common/dispatch_event.chainable': () => null,
			'../../common/persist_event.chainable': () => null,
			'../../common/publish_event.chainable': () => null,
			'node-uuid': {
				v4: () => undefined
			},
			'../../log': () => null
		});

		return personFirstNameChangeCommandHandler({})
			.catch(err => {
				expect(err).to.be.an('object');
				expect(err.err).to.equal('ERROR');
			});
	});
});
