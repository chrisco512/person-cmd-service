const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList
} = require('graphql');
const { Tenant, Employee, Person } = require('./types');
const store = require('../store');


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
      name: 'Query',
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
        }
      }
    })
    // mutation:
});

module.exports = schema;
