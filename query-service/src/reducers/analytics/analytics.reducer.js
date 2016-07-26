const _ = require('lodash');

const {
	TENANT_CREATED,
	TENANT_EMPLOYEE_DATA_IMPORTED,
  PERSON_CREATED,
  MANAGER_ADDED,
  USER_CREATED,
	PERSON_FIRST_NAME_CHANGED,
	PERSON_LAST_NAME_CHANGED,
	PERSON_EMAIL_CHANGED,
	PERSON_PHONE_CHANGED,
	PERSON_CARRIER_CHANGED,
	PILLAR_CREATED,
	PILLAR_DELETED,
	PILLAR_NAME_CHANGED,
	POINT_INCREMENTED,
	POINT_DECREMENTED

	} = require('../../event_types');

function reducer(analytics = {}, action) {
	switch(action.type) {
		case TENANT_EMPLOYEE_DATA_IMPORTED:
			return tenantEmployeeDataImported(analytics, action.payload);
    case PILLAR_CREATED:
			return noop(analytics, action.payload);
		case PILLAR_DELETED:
			return noop(analytics, action.payload);
		case PILLAR_NAME_CHANGED:
			return noop(analytics, action.payload);
    case PERSON_CREATED:
			return noop(analytics, action.payload);
		case PERSON_FIRST_NAME_CHANGED:
			return noop(analytics, action.payload);
		case PERSON_LAST_NAME_CHANGED:
			return noop(analytics, action.payload);
		case PERSON_EMAIL_CHANGED:
			return noop(analytics, action.payload);
		case PERSON_PHONE_CHANGED:
			return noop(analytics, action.payload);
		case PERSON_CARRIER_CHANGED:
			return noop(analytics, action.payload);
    case TENANT_CREATED:
			return noop(analytics, action.payload);
    case USER_CREATED:
      return noop(analytics, action.payload);
    case MANAGER_ADDED:
      return noop(analytics, action.payload);
	}
	return analytics;
}

function noop(analytics, action) {
  return analytics;
}

function tenantEmployeeDataImported(analytics, payload) {
	if(!analytics.employeesCreated) analytics.employeesCreated = 0;
	analytics.employeesCreated ++;
	return analytics;
}

module.exports = reducer;
