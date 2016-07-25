const {
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString
} = require('graphql');

const axios = require('axios');
const { Person, CarrierEnum } = require('../../types');

const PERSON_CREATE = {
  type: Person,
  description: 'Creates a Person and sends `command.PERSON_CREATE`',
  args: {
    email: {type: new GraphQLNonNull(GraphQLString)},
    carrier: {type: CarrierEnum},
    phone: {type: new GraphQLNonNull(GraphQLFloat)},
    firstName: {type: new GraphQLNonNull(GraphQLString)},
  	lastName: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.PERSON_CREATE';

    const body = {
      type,
      payload: args
    };
    return axios.post('http://person-cmd/', body)
                .then( res => res.data )
                .catch(res => { throw res.data; });
  }
};

module.exports = PERSON_CREATE;
