const { PERSON_CREATE, USER_CREATE } = require('../command_types');
const log = require('../../log');
const axios = require('axios');

const { personCommandUrl, userCommandUrl } = require('../../config').services;

function* employeeImport(employee, tenantId) {
	//CREATE PERSON FROM REQUEST INFO
	const createPersonCommand = {
		type: PERSON_CREATE,
		payload: {
			firstName: employee.firstName,
			lastName: employee.lastName,
			phone: employee.phone,
			carrier: employee.carrier,
			email: employee.email
		}
	};

	console.log('Node environ variable - ', process.env.NODE_ENV);
	log.info('CREATING USER - url: ', personCommandUrl, '; command: ', createPersonCommand);

	let personPayload;
	try {
		const { data } = yield axios.post(personCommandUrl, createPersonCommand);
		personPayload = data;
		log.info('person created - ', personPayload);
	} catch (err) {
		log.warn('Error on importing employee - ', err);
		throw err;
	}

	//CREATE USER FROM REQUEST INFO
	const createUserCommand = {
		type: USER_CREATE,
		payload: {
			role: employee.role,
			tenantId,
			auth0Id: 'letmein123abc',
			personId: personPayload._id,
			companyIdentifier: employee.companyIdentifier,
			email: employee.email
		}
	};

	console.log('Node environ variable - ', process.env.NODE_ENV);

	log.info('CREATING USER - url: ', userCommandUrl, '; command: ', createUserCommand);

	let userPayload;
	try {
		const { data } = yield axios.post(userCommandUrl, createUserCommand);
		userPayload = data;
		log.info('user created - ', userPayload);
	} catch (err) {
		log.warn('Error on creating user from imported employee - ', err);
		throw err;
	}

	//RETURN ANY ERRORS OR PAYLOAD

}

module.exports = employeeImport;
