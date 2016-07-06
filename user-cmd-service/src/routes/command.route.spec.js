const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire').noCallThru();
chai.use(sinonChai);

const { VALIDATION_ERROR, SERVER_ERROR } = require('../error_types');

describe('commandRoute', () => {
	it('should call store.dispatch with the event passed in', () => {
		let stubs = {
			'../commands': function() {}
		};

		let context = {
			request: {
				body: {}
			},
			response: {}
		};

		let commandRoute = proxyquire('./command.route', stubs);

		let commandRouteGenObj = commandRoute.call(context);

		commandRouteGenObj.next();
		commandRouteGenObj.next({ payload: 'Yay' });

		expect(context.response.status).to.equal(200);
		expect(context.response.body).to.equal('Yay');
	});

	it('should throw a validation error with a 400 and the associated errors', () => {
		let stubs = {
			'../commands': function() {}
		};

		let context = {
			request: {
				body: {}
			},
			response: {}
		};

		let commandRoute = proxyquire('./command.route', stubs);

		let commandRouteGenObj = commandRoute.call(context);

		commandRouteGenObj.next();
		commandRouteGenObj.throw({ type: VALIDATION_ERROR, errors: 'Errors' });

		expect(context.response.status).to.equal(400);
		expect(context.response.body).to.equal('Errors');
	});

	it('should throw a server error with an empty body', () => {
		let stubs = {
			'../commands': function() {}
		};

		let context = {
			request: {
				body: {}
			},
			response: {}
		};

		let commandRoute = proxyquire('./command.route', stubs);

		let commandRouteGenObj = commandRoute.call(context);

		commandRouteGenObj.next();
		commandRouteGenObj.throw({ type: SERVER_ERROR, errors: 'Errors' });

		expect(context.response.status).to.equal(500);
		expect(context.response.body).to.equal('');
	});
});