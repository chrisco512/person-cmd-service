const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const multer = require('multer');
const schema = require('./schema');

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

module.exports = app;
