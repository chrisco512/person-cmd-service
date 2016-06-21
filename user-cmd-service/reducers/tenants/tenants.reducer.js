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

function tenantCreated(tenants, { _id }) {
	return [...tenants, { _id }];
}

module.exports = reducer;
