const {
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString
} = require('graphql');

const axios = require('axios');
const { Point } = require('../../types');

const POINT_INCREMENT = {
  type: Point,
  description: 'Increments a user\'s point count by a given amount and sends `command.POINT_INCREMENT`',
  args: {
    count: {type: new GraphQLNonNull(GraphQLFloat)},
    userId: {type: new GraphQLNonNull(GraphQLString)},
  },
  resolve: (rootValue, args) => {
    const type = 'command.POINT_INCREMENT';
    const body = {
      type,
      payload: args
    };
    return axios.post('http://point-cmd/', body)
                .then( res => res.data)
                .catch(err => { throw err.data; });
  }
};

module.exports = POINT_INCREMENT;
