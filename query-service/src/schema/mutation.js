const {
  GraphQLObjectType
} = require('graphql');

const mutations = require('./mutations');

const mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Root of all mutations',
  fields: () => mutations
});

module.exports = mutation;
