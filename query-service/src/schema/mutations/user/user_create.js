const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const axios = require('axios');
const { User } = require('../../types');

const USER_CREATE = {
  type: User,
  description: 'Creates a User and sends `command.USER_CREATE`',
  args: {
    email: {type: new GraphQLNonNull(GraphQLString)},
    role: {type: new GraphQLNonNull(GraphQLString)},
    tenantId: {type: new GraphQLNonNull(GraphQLString)},
    auth0Id: {type: new GraphQLNonNull(GraphQLString)},
    personId: {type: new GraphQLNonNull(GraphQLString)},
    companyIdentifier: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.USER_CREATE';
    const body = {
      type,
      payload: args
    };
    console.log(body);
    return axios.post('http://user-cmd/', body)
                .then( res => res.data)
                .catch(err => { throw err.data; });
  }
};

module.exports = USER_CREATE;
