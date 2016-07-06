const _ = require('lodash');
const {
	TENANT_CREATED
} = require('../../commands/event_types');

function reducer(tenants = [], action ) {
	console.log("In tenant reducer - ", action);
	switch(action.type) {
		case TENANT_CREATED:
			return tenantCreated(tenants, action.payload);
	}
	return tenants;
}

function tenantCreated(tenants, payload) {
	console.log("Making tenant with action - ", TENANT_CREATED);
	return [...tenants, payload];
}

module.exports = reducer;