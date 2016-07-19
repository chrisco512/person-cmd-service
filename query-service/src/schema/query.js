const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const {
  Tenant,
  Employee,
  Person,
  User,
  Manager
} = require('./types');

const store = require('../store');


const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: {
    tenants: {
      type: new GraphQLList(Tenant),
      resolve: function() {
        return store.getState().tenants;
      }
    },
    employees: {
      type: new GraphQLList(Employee),
      resolve: function() {
        return store.getState().employees;
      }
    },
    persons: {
      type: new GraphQLList(Person),
      resolve: function() {
        return store.getState().persons;
      }
    },
    users: {
      type: new GraphQLList(User),
      resolve: function() {
        return store.getState().users
      }
    },
    managers: {
      type: new GraphQLList(Manager),
      resolve: function() {
        return store.getState().users.filter((user) => {
          return user.roles.includes("manager")
        });
      }
    }
  }
})

module.exports = query;
