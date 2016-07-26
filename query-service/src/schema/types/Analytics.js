const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const Analytics = new GraphQLObjectType({
  name: 'Analytics',
  description: 'All the stats',
  fields: () => ({
    tenantCount: {
      type: GraphQLInt,
      description: 'The number of tenants'
    }
  })
});

module.exports = Analytics;
