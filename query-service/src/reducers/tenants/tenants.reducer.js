const _ = require('lodash');
const {
	TENANT_CREATED
	} = require('../../event_types');

function reducer(tenants = [], action ) {
	switch(action.type) {
		case TENANT_CREATED:
			return tenantCreated(tenants, action);
	}
	return tenants;
}


function tenantCreated(tenants, action) {
	return [...tenants, action.payload];
}


module.exports = reducer;