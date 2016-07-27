const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const axios = require('axios');
const { Pillar } = require('../../types');

const PILLAR_CREATE = {
  type: Pillar,
  description: 'Creates a pillar `command.PILLAR_CREATE`',
  args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    isDeleted: {type: new GraphQLNonNull(GraphQLBoolean)},
    tenantId: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.PILLAR_CREATE';
    const body = {
      type,
      payload: args
    };
    return axios.post('http://pillar-cmd/', body)
                .then( res => res.data)
                .catch(res => {throw JSON.stringify(res.data); });
  }
};

module.exports = PILLAR_CREATE;
