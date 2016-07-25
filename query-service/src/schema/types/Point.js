const { GraphQLObjectType, GraphQLFloat } = require('graphql');
const User = require('./User');
const store = require('../../store');

const Point = new GraphQLObjectType({
  name: 'Point',
  fields: () => ({
    user: {
      type: User,
      description: 'User with the points',
      resolve: (point) => store.getState().users.filter( u => u._id === point.userId )
    },
    count: {
      type: GraphQLFloat,
      description: 'The amount of points the user has acquired'
    }
  })
});

console.log('⚡️');
console.log(User);

module.exports = Point;
