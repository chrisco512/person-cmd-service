'use strict';

var path = require('path');
var _ = require('underscore');

var all = {
    port: process.env.PORT || 8010,
    servicebus: {
        uri: "amqp://localhost"
        // uri: "amqp://rabbit"
    },
    mongo: {
        // uri: "mongodb://mongo/test"
        uri: "mongodb://localhost/test"
    },
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/../../..'), // Root path of server
    secrets: {
        session: 'culture-shock-secret'
    }
};

// NODE_ENV Overrides
module.exports = _.extend(all, require('./' + process.env.NODE_ENV + '.js') || {});
