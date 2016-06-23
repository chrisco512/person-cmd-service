'use strict';

var path = require('path');
var _ = require('underscore');

var all = {
    port: process.env.PORT || 8080,
    servicebus: {
        uri: "amqp://localhost:5672" //"amqp://rabbit"
    },
    mongo: {
        uri: "localhost:27017/test" //"mongodb://mongo/test"
    },
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/../../..'), // Root path of server
    secrets: {
        session: 'culture-shock-secret'
    }
};

// NODE_ENV Overrides
module.exports = _.extend(all, require('./' + process.env.NODE_ENV + '.js') || {});