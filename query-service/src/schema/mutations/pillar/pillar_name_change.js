const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const axios = require('axios');
const { Pillar } = require('../../types');

const PILLAR_NAME_CHANGE = {
  type: Pillar,
  description: 'sends `command.PILLAR_NAME_CHANGE`',
  args: {
    // _id: {type: new GraphQLNonNull(GraphQLString)},
    index: {type: new GraphQLNonNull(GraphQLInt)},
    name: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.PILLAR_NAME_CHANGE';

    const body = {
      type,
      payload: args
    };
    return axios.post('http://pillar-cmd/', body)
                .then( res => res.data )
                .catch(res => {throw JSON.stringify(res.data); });
  }
};

module.exports = PILLAR_NAME_CHANGE;
