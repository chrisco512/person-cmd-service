const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const CarrierEnum = require('./CarrierEnum');

const Person = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the person'
    },
    firstName: {
      type: GraphQLString,
      description: 'First name of the person'
    },
    lastName: {
      type: GraphQLString,
      description: 'Last name of the person'
    },
    email: {
      type: GraphQLString,
      description: 'Email of the person'
    },
    phone: {
      type: GraphQLInt,
      description: 'Phone number of the person'
    },
    carrier: {
      type: CarrierEnum,
      description: 'Cell carrier number of the person'
    }
  })
});

module.exports = Person;
