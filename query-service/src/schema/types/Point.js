const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql');

const Point = new GraphQLObjectType({
  name: 'Point',
  fields: () => ({
    userId: {
      type: GraphQLString,
      description: 'User id with the points'
    },
    count: {
      type: GraphQLFloat,
      description: 'The amount of points the user has acquired'
    }
  })
});

module.exports = Point;
