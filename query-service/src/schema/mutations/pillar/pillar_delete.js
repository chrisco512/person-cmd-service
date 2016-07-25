const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const axios = require('axios');
const { Pillar } = require('../../types');

const PILLAR_DELETE = {
  type: Pillar,
  description: 'Deletes a pillar `command.PILLAR_DELETE`',
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    isDeleted: {type: new GraphQLNonNull(GraphQLBoolean)},
    tenantId: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.PILLAR_DELETE';
    const body = {
      type,
      payload: args
    };
    return axios.post('http://pillar-cmd/', body)
                .then( res => res.data)
                .catch(err => { throw err.data; });
  }
};

module.exports = PILLAR_DELETE;
