'use strict';
module.exports = function* unprotected(next){
	if (this.url.match(/^\/public/)) {
		this.body = 'unprotected\n';
	} else {
		yield next;
	}
};