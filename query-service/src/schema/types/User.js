const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User description',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the User'
    },
    role: {
      type: GraphQLString,
      description: 'Role of the User'
    },
    tenantId: {
      type: GraphQLString,
      description: 'Tenant that the User is tied to.'
    },
    auth0Id: {
      type: GraphQLString,
      description: 'Auth0Id of the User'
    },
    personId: {
      type: GraphQLString,
      description: 'PersonId of the User'
    },
    companyIdentifier: {
      type: GraphQLString,
      description: 'Tenant-provided Id of the User'
    },
    email: {
      type: GraphQLString,
      description: 'Email address of the User'
    }
  })
});

module.exports = User;
