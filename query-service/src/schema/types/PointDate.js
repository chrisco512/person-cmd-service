const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql');

const PointDate = new GraphQLObjectType({
  name: 'PointDate',
  fields: () => ({
    date: {
      type: GraphQLString,
      description: 'The date'
    },
    count: {
      type: GraphQLFloat,
      description: 'The amount of points made in a day'
    }
  })
});

module.exports = PointDate;
