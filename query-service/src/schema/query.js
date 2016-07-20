const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const {
  Tenant,
  Employee,
  Person,
  User,
  Manager,
  Pillar,
  Content
} = require('./types');

const store = require('../store');

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: {
    tenants: {
      type: new GraphQLList(Tenant),
      resolve() {
        return store.getState().tenants;
      }
    },
    employees: {
      type: new GraphQLList(Employee),
      resolve() {
        return store.getState().employees;
      }
    },
    persons: {
      type: new GraphQLList(Person),
      resolve() {
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
    },
    pillars: {
      type: new GraphQLList(Pillar),
      resolve() {
        return store.getState().pillars;
      }
    },
    contents: {
      type: new GraphQLList(Content),
      resolve() {
        return store.getState().contents;
      }
    }
  }
});

module.exports = query;
