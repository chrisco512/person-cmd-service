const store = require('../../store');
const User = require('./User');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');


const Manager = new GraphQLObjectType({
  name: 'Manager',
  description: 'Manager description',
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
    },
    employees: {
      type: new GraphQLList(User),
      description: 'If user is a manager, this will be their underlings (minions)',
      resolve: (user) => {
        return store.getState().users.filter((u) => user._id === u.managerId);
      }
    }
  })
});

module.exports = Manager;
