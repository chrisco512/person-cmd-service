const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const multer = require('multer');
const schema = require('./schema');
const jwt = require('express-jwt');
const nodejwt = require('jsonwebtoken');
const store = require('./store');
const _ = require('lodash');

var jwtCheck = jwt({
	secret: new Buffer('_Q6yaFBkbnQhNCn2PJmrxFf8v8CAIIu0FZJp84ZdMplyvzNjfqv6FOHHBX0sJEJA', 'base64'),
	audience: 'Ty9ofoTxjYJqOlCSnqKhaSDWPurI3DzU',
	getToken: function fromHeaderOrQuerystring (req) {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			return req.headers.authorization.split(' ')[1];
		} else if (req.query && req.query.token) {
			return req.query.token;
		}
		return null;
	}
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '/tmp'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}.csv`)
});

const app = express();

app.use( cors() );

app.use('/graphql', multer({
  storage,
  fileFilter: (req, file, cb) => { return file.originalname.endsWith('.csv') ? cb(null, true) : cb(null, false); }
}).single('file'));

app.use('/graphql', graphqlHTTP( request => ({
  schema,
  graphiql: true,
  rootValue: { request },
  formatError: err => {
    if(err.originalError) {
      return { message: err };
    } else {
      return { message: err.message, locations: err.locations };
    }
  }
})));

app.use('/augmentjwt', jwtCheck, function(req, res) {
	var token = req.headers.authorization.split(' ')[1];
	console.log('Token: ', token);
	var decoded = nodejwt.decode(token);
	console.log('Decoded: ', decoded);
	var auth0Id = decoded.sub;
	console.log('User Id: ', auth0Id);
	var users = store.getState().users;
	console.log(users);
	var user = _.find(users, { auth0Id }) || {};
	console.log('User: ', user);

	var user_metadata = {
		userId: user._id,
		tenantId: user.tenantId,
		personId: user.personId
	};

	var tokenData = Object.assign({}, decoded, { user_metadata });
	var newToken = nodejwt.sign(tokenData, new Buffer('_Q6yaFBkbnQhNCn2PJmrxFf8v8CAIIu0FZJp84ZdMplyvzNjfqv6FOHHBX0sJEJA', 'base64'));

	console.log('New Token: ', newToken);
	console.log('Decoded New Token: ', nodejwt.decode(newToken));

	res.status(200).send(newToken);
});

module.exports = app;
