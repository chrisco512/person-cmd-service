const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const axios = require('axios');
const { Content, ContentTypeEnum, InputContentData } = require('../../types');

const CONTENT_CREATE = {
  type: Content,
  description: 'Creates a content `command.CONTENT_CREATE`',
  args: {
    type: {type: ContentTypeEnum},
    pillarId: {type: new GraphQLNonNull(GraphQLString)},
    isDeleted: {type: new GraphQLNonNull(GraphQLBoolean)},
    data: {type: new GraphQLNonNull(InputContentData)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.CONTENT_CREATE';
    const body = {
      type,
      payload: args
    };
    return axios.post('http://content-cmd/', body)
                .then( res => res.data)
                .catch(err => { throw err.data; });
  }
};

module.exports = CONTENT_CREATE;
