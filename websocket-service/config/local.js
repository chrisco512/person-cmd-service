'use strict';

// LOCAL
module.exports = {
  port: process.env.PORT || 8181,
  servicebus: {
      uri: process.env.RABBIT_URI || "amqp://localhost"
  },
  mongo: {
      uri: process.env.MONGO_URI || "mongodb://localhost:27017/culture"
  },
  root: path.normalize(__dirname + '/../../..'), // Root path of server
  secrets: {
      session: 'culture-shock-secret'
  },
  emitEchoEvents: true
};
