const { USER_CREATED } = require('../event_types');
const uuid = require('node-uuid');

function userCreated({ role, tenantId, auth0Id, personId, companyIdentifier, email }) {
	console.log('EVENT CREATOR:', { role, tenantId, auth0Id, personId, companyIdentifier, email });
	const _id = uuid.v4();

	return {
		type: USER_CREATED,
		payload: { _id, role, tenantId, auth0Id, personId, companyIdentifier, email }
	};
}

module.exports = userCreated;
