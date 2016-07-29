const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} = require('graphql');

const axios = require('axios');
const { Content, ContentTypeEnum, InputContentData } = require('../../types');

const CONTENT_DELETE = {
  type: Content,
  description: 'Deletes a content `command.CONTENT_DELETE`',
  args: {
    _id: {type: new GraphQLNonNull(GraphQLString)},
    type: {type: ContentTypeEnum},
    pillarId: {type: new GraphQLNonNull(GraphQLString)},
    isDeleted: {type: new GraphQLNonNull(GraphQLBoolean)},
    data: {type: new GraphQLNonNull(InputContentData)}
  },
  resolve: (rootValue, args) => {
    const type = 'command.CONTENT_DELETE';
    const body = {
      type,
      payload: args
    };
    return axios.post('http://content-cmd/', body)
                .then( res => res.data)
                .catch(err => { throw err.data; });
  }
};

module.exports = CONTENT_DELETE;
