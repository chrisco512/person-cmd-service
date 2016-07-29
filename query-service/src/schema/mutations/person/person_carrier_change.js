const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const axios = require('axios');
const { Person } = require('../../types');

const PERSON_CARRIER_CHANGE = {
  type: Person,
  description: 'sends `command.PERSON_CARRIER_CHANGE`',
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    carrier: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.PERSON_CARRIER_CHANGE';

    const body = {
      type,
      payload: args
    };
    return axios.post('http://person-cmd/', body)
                .then( res => res.data )
                .catch(res => {throw JSON.stringify(res.data); });
  }
};

module.exports = PERSON_CARRIER_CHANGE;
