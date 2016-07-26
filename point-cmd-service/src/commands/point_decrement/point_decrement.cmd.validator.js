const store = require('../../store');
const { createValidator, required, integer, valueExistsInCollection, overrideErrorMessage, atLeast } = require('validations');
const { VALIDATION_ERROR } = require('../../error_types');

const validatePoint = createValidator({
  userId: [required, valueExistsInCollection],
  count: [required, integer, overrideErrorMessage( atLeast(0), 'Cannot decrement beyond zero')]
});

function pointDecrementCommand(payload) {
	return new Promise( (resolve, reject) => {
		const { points } = store.getState();

    let value;
    const pointObj = points.filter( p => p.userId === payload.userId)[0];
    if(pointObj) {
      value = pointObj.count;
    }

    const appliedPoint = Object.assign({}, payload, {
      // undefined - Number === NaN
      // NaN > 5 returns NaN which is falsy, so the count validation will fail.
      // Fun Fact: NaN === NaN is false. 🙃 
      count: value - payload.count
    });

		const errors = validatePoint(appliedPoint, null, points);
		const isErrors = Object.keys(errors).length;

		if(isErrors) {
			reject({ type: VALIDATION_ERROR, errors });
		}

		resolve(payload);
	});
}

module.exports = pointDecrementCommand;
