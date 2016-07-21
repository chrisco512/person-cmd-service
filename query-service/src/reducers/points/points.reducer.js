const _ = require('lodash');
const {
	USER_CREATED,
	POINTS_INCREMENTED,
	POINTS_DECREMENTED
} = require('../../event_types');

function reducer(points = [], action ) {
	switch(action.type) {
		case USER_CREATED:
			return [ ...points, { userId: action.payload._id, count: 0 }];
		case POINTS_INCREMENTED:
			return incrementPoints(points, action.payload);
		case POINTS_DECREMENTED:
			return decrementPoints(points, action.payload);
		default:
			return points;
	}
}

function incrementPoints(points, payload) {
	const index = _.findIndex(points, (p) => p._id === payload._id);
	if(index < 0) { throw new Error('Point does not exist!'); }

	const newPoint = Object.assign({}, points[index], {
		count: points[index] + payload.count
	});

	return [
		...points.slice(0, index),
		newPoint,
		...points.slice(index + 1)
	];
}

function decrementPoints(points, payload) {
	const index = _.findIndex(points, (p) => p._id === payload._id);
	if(index < 0) { throw new Error('Point does not exist!'); }

	const newPoint = Object.assign({}, points[index], {
		count: points[index] - payload.count
	});

	return [
		...points.slice(0, index),
		newPoint,
		...points.slice(index + 1)
	];
}

module.exports = reducer;
