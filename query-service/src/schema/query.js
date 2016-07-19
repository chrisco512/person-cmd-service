const {
  GraphQLObjectType,
  GraphQLList
} = require('graphql');

const {
  Tenant,
  Employee,
  Person,
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
