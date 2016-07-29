const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const Analytics = new GraphQLObjectType({
  name: 'Analytics',
  description: 'All the stats',
  fields: () => ({
    tenantCount: {
      type: GraphQLInt,
      description: 'The number of tenants'
    },
    userCount: {
      type: GraphQLInt,
      description: 'The number of daily active users'
    },
    managerCount: {
      type: GraphQLInt,
      description: 'The number of managers'
    },
    employeeCount: {
      type: GraphQLInt,
      description: 'The number of employees'
    },
    totalPoints: {
      type: GraphQLInt,
      description: 'The total number of points'
    },
    pillarCount: {
      type: GraphQLInt,
      description: 'The number of pillars'
    },
    contentCount: {
      type: GraphQLInt,
      description: 'The number of contents'
    }
  })
});

module.exports = Analytics;
