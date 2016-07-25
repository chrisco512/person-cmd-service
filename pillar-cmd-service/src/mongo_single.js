const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const { uri } = config.mongo;

let dbInstance;

function connect() {
	return new Promise((resolve, reject) => {
		if (dbInstance !== undefined) {
			resolve(dbInstance);
		}

		MongoClient.connect(uri, function (err, db) {
			if(err) {
				return reject(err);
			}

			if(db) {
				dbInstance = db;
				resolve(dbInstance);
			}
		});
	});
}

module.exports = {
	connect
};
