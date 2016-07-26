const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const Analytics = new GraphQLObjectType({
  name: 'Analytics',
  description: 'All the stats',
  fields: () => ({
    employeeCount: {
      type: GraphQLInt,
      description: 'The number of employees imported'
    }
  })
});

module.exports = Analytics;
