//Will be in charge of persisting to mongo
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const config = require('../config');
const uri = config.mongo.uri;
const log = require('../log');
const { SERVER_ERROR } = require('../error_types');
const { db } = require("../utils");

function persistEvent(event) {
                  console.log("GOT EEEM!");
        return new Promise((resolve, reject) => {
                  console.log("GOT EEEM2!");
                db.collection('events').insertOne(event, function(err, r) {
                  console.log("GOT EEEM3!");

                        if(err) {
                                log.warn('ERROR PERSISTING EVENT: ', event);
                                reject({ type: SERVER_ERROR, err });
                        }

                        resolve(r.result);
                });
        });
}

module.exports = persistEvent;
