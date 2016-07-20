const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

const axios = require('axios');
const { Person } = require('../../types');

const PERSON_LAST_NAME_CHANGE = {
  type: Person,
  description: 'sends `command.PERSON_LAST_NAME_CHANGE`',
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    lastName: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.PERSON_LAST_NAME_CHANGE';

    const body = {
      type,
      payload: args
    };
    return axios.post('http://person-cmd/', body)
                .then( res => res.data )
                .catch(res => { throw res.data; });
  }
};

module.exports = PERSON_LAST_NAME_CHANGE;
