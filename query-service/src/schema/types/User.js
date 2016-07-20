const store = require('../../store');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
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
    manager: {
      type: User, 
      resolve: (user) => {
        const manager = store.getState().users.filter((u) => {
          return u._id === user.managerId;
        });

        if(manager.length > 0) {
          return manager[0];
        }

        return null;
      }
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
