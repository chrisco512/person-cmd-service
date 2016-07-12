const {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType
} = require('graphql');
const fs = require('fs');

const axios = require('axios');
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

    console.log(rootValue.request.file);

    // fs.createReadStream(rootValue.request.file).pipe(axios.post('http://saga-service/'));
    // return rootValue.request.file
    console.log('About to post!!!');
    // TODO: DELETE in the then.
    try {
      return axios.post('http://saga-service/employee_record_import', fs.createReadStream(rootValue.request.file.path))
                .then( res => { console.log(res.data); return res.data })
                .catch( err => { console.log('ERROR');console.log(err); throw err.data });
              } catch(err) {
                console.log(err);
              }


  }
};

module.exports = EMPLOYEE_IMPORT_SAGA;
