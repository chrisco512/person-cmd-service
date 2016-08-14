const {
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString
} = require('graphql');

const axios = require('axios');
const { Point } = require('../../types');

const POINT_DECREMENT = {
  type: Point,
  description: 'Decrements a user\'s point count by a given amount and sends `command.POINT_DECREMENT`',
  args: {
    count: {type: new GraphQLNonNull(GraphQLFloat)},
    userId: {type: new GraphQLNonNull(GraphQLString)},
    date: {type: GraphQLString},
  },
  resolve: (rootValue, args) => {
    const type = 'command.POINT_DECREMENT';
    const body = {
      type,
      payload: args
    };
    return axios.post('http://point-cmd/', body)
                .then( res => res.data)
                .catch(res => {throw JSON.stringify(res.data); });
  }
};

module.exports = POINT_DECREMENT;
