const _ = require('lodash');
const {
	USER_CREATED,
	POINT_INCREMENTED,
	POINT_DECREMENTED
} = require('../../event_types');

function reducer(points = [], action ) {
	switch(action.type) {
		case USER_CREATED:
			return [ ...points, { userId: action.payload._id, count: 0 }];
		case POINT_INCREMENTED:
			return incrementPoints(points, action.payload);
		case POINT_DECREMENTED:
			return decrementPoints(points, action.payload);
		default:
			return points;
	}
}

function incrementPoints(points, payload) {
	const index = _.findIndex(points, (p) => p.userId === payload.userId);
	if(index < 0) { throw new Error('Point does not exist!'); }

	const newPoint = Object.assign({}, points[index], {
		count: points[index].count + payload.count
	});

	return [
		...points.slice(0, index),
		newPoint,
		...points.slice(index + 1)
	];
}

function decrementPoints(points, payload) {
	const index = _.findIndex(points, (p) => p.userId === payload.userId);
	if(index < 0) { throw new Error('Point does not exist!'); }

	const newPoint = Object.assign({}, points[index], {
		count: points[index].count - payload.count
	});

	return [
		...points.slice(0, index),
		newPoint,
		...points.slice(index + 1)
	];
}

module.exports = reducer;
