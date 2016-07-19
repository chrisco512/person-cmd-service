'use strict';
module.exports = function* unauthorized(next){
	try {
		yield next;
	} catch (err) {
		if (err.status == 401) {
			this.status = 401;
			this.body = 'Protected resource, use Authorization header to get access\n';
		} else {
			throw err;
		}
	}
};
