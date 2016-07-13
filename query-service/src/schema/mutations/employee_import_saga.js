const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
} = require('graphql');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const { EmployeeImportSaga } = require('../types');
const request = require('request');

const EMPLOYEE_IMPORT_SAGA = {
  type: EmployeeImportSaga,
  description: 'Imports Employees CSV and sends `command.EMPLOYEE_IMPORT_SAGA` a multipart form with csvFile and tenantId fields are expected.',
  resolve: (rootValue, args) => {
    const type = 'command.EMPLOYEE_IMPORT_SAGA';

    // const form = new FormData();
    // form.append('csvFile', fs.createReadStream(rootValue.request.file.path) );
    // form.append('tenantId', rootValue.request.body.tenantId);

    const formData = {
      csvFile: fs.createReadStream(rootValue.request.file.path),
      tenantId: rootValue.request.body.tenantId
    };

    return new Promise( (resolve, reject) => {
      request.post({ url: 'http://saga-service/employee_record_import', formData }, function(err, res, body) {
        if(err) reject(err);
        resolve(body);
      });
    })
      .then(body => JSON.parse(body))
      .then( body => { fs.unlinkSync(rootValue.request.file.path); return body;})
      .catch( err => { console.log('ERROR');console.log(err); throw err });
  }
};

module.exports = EMPLOYEE_IMPORT_SAGA;
