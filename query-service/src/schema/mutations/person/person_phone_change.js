const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat
} = require('graphql');

const axios = require('axios');
const { Person } = require('../../types');

const PERSON_PHONE_CHANGE = {
  type: Person,
  description: 'sends `command.PERSON_PHONE_CHANGE`',
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    phone: {type: new GraphQLNonNull(GraphQLFloat)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.PERSON_PHONE_CHANGE';

    const body = {
      type,
      payload: args
    };
    return axios.post('http://person-cmd/', body)
                .then( res => res.data )
                .catch(res => {throw JSON.stringify(res.data); });
  }
};

module.exports = PERSON_PHONE_CHANGE;
