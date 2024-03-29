const store = require('../../store');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const Point = require('./Point');
const Person = require('./Person');

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
    person: {
      type: Person,
      description: 'The Person associated with the user',
      resolve: (user) =>
        store.getState().persons.filter( p => p._id === user.personId)[0] || null
    },
    points: {
      type: Point,
      resolve: (user) =>
        store.getState().points.filter( p => p.userId === user._id)[0] || null
    },
    manager: {
      type: User,
      resolve: (user) =>
        store.getState().users.filter( u => u._id === user.managerId )[0] || null
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
