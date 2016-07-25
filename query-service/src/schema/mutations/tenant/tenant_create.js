const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const log = require('../../../log');
const axios = require('axios');
const { Tenant, InputTenantContact } = require('../../types');

const TENANT_CREATE = {
  type: Tenant,
  description: 'Creates a Person and sends `command.TENANT_CREATE`',
  args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    address: {type: new GraphQLNonNull(GraphQLString)},
    contact: {type: new GraphQLNonNull(InputTenantContact)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.TENANT_CREATE';
    console.log(args);

    const body = {
      type,
      payload: args
    };
    return axios.post('http://tenant-cmd/', body)
                .then( res => res.data )
                .catch(err => { log.error('💥 TENANT_CREATE ERROR ', err.data); throw err.data; });
  }
};

module.exports = TENANT_CREATE;
