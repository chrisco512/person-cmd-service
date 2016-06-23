const { PERSON_CREATE, USER_CREATE } = require('../command_types');
const log = require('../../log');
const axios = require('axios');

const { personCommandUrl, userCommandUrl } = require('../../config').services;

function* employeeImport(employee, tenantId) {
	//CREATE PERSON FROM REQUEST INFO
	const createPersonCommand = {
		type: PERSON_CREATE,
		payload: {
			first_name: employee.first_name,
			last_name: employee.last_name,
			phone: employee.phone,
			carrier: employee.carrier,
			email: employee.email
		}
	};

	let personPayload;
	try {
		let { data } = yield axios.post(personCommandUrl, createPersonCommand);
		personPayload = data;
		log.info("person created - ", personPayload);
	} catch (err) {
		log.warn("Error on importing employee - ", err);
		throw err;
	}

	//CREATE USER FROM REQUEST INFO
	const createUserCommand = {
		type: USER_CREATE,
		payload: {
			role: employee.role,
			tenantID: tenantId,
			auth0ID: "letmein123abc",
			personID: personPayload._id,
			companyIdentifier: employee.company_identifier,
			email: employee.email
		}
	};

	let userPayload;
	try {
		let { data } = yield axios.post(userCommandUrl, createUserCommand);
		userPayload = data;
		log.info("user created - ", userPayload);
	} catch (err) {
		log.warn("Error on creating user from imported employee - ", err);
		throw err;
	}

	//RETURN ANY ERRORS OR PAYLOAD

}

module.exports = employeeImport;