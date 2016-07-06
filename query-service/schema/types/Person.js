const Person = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the person'
    },
    first_name: {
      type: GraphQLString,
      description: 'First name of the person'
    },
    last_name: {
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
      type: GraphQLString,
      description: 'Cell carrier number of the person'
    }
  })
});

module.exports = Person;
