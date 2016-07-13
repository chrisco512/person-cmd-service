const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
} = require('graphql');
const fs = require('fs');

const axios = require('axios');
const FormData = require('form-data');
// const { Tenant, InputTenantContact } = require('../types');

const UploadedFileType = new GraphQLObjectType({
  name: 'UploadedFile',
  fields: {
    originalname: {type: GraphQLString},
    mimetype: {type: GraphQLString}
  }
})

const EMPLOYEE_IMPORT_SAGA = {
  type: UploadedFileType,
  description: 'Imports Employees CSV and sends `command.EMPLOYEE_IMPORT_SAGA`',
  // args: {
  //   name: {type: new GraphQLNonNull(GraphQLString)},
  //   address: {type: new GraphQLNonNull(GraphQLString)},
  //   contact: {type: new GraphQLNonNull(InputTenantContact)}
  // },
  resolve: (rootValue, args) => {
    const type = 'command.EMPLOYEE_IMPORT_SAGA';

    const body = {
      type,
      payload: args
    };

    console.log('💥');

    const form = new FormData();
    console.log('💥');
    form.append('csvFile', fs.createReadStream(rootValue.request.file.path) );
    console.log('💥');
    form.append('tenantId', rootValue.request.body.tenantId);
    console.log('💥');


    console.log('🤔', rootValue.request);
    console.log('🔥',rootValue.request.headers);

    // return rootValue.request.file
    // TODO: DELETE in the then.
    return new Promise( (resolve, reject) => {
      form.submit('http://saga-service/employee_record_import', function(err, res) {
        console.log('❄️ ', res);
        console.log('❄️ ', err);
        if(err) reject(err);
        resolve(res);
      });
    }).then( res => { console.log(res); return res })
      .catch( err => { console.log('ERROR');console.log(err); throw err });
    // axios.post('http://saga-service/employee_record_import', form)
    //



  }
};

module.exports = EMPLOYEE_IMPORT_SAGA;
