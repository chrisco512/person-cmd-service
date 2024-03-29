'use strict';
const path = require('path');

// PRODUCTION
module.exports = {
  port: process.env.PORT || 80,
  servicebus: {
      uri: process.env.RABBIT_URI || 'amqp://rabbit'
  },
  mongo: {
      uri: process.env.MONGO_URI || 'mongodb://mongo/culture'
  },
  root: path.normalize(`${__dirname}/../../..`), // Root path of server
  secrets: {
      session: 'culture-shock-secret'
  },
  emitEchoEvents: false
};
