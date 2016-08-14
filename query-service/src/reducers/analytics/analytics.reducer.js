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
		case POINT_INCREMENTED:
			return rollupPoints(analytics, action.payload);
	}
	return analytics;
}

function rollupPoints(analytics, payload) {
	analytics.pointsByDate = analytics.pointsByDate || [];
	let date = (new Date(payload.date)).toLocaleDateString("en-us");
	let index =  _.findIndex(analytics.pointsByDate, {date: date})

	if(index < 0) {
		analytics.pointsByDate.push({
			date: date,
			count: payload.count,
		});
	} else {
		analytics.pointsByDate[index].count += payload.count;
	}

	return analytics;
}

module.exports = reducer;
