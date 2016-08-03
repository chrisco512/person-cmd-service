const {
  GraphQLNonNull,
  GraphQLInt
} = require('graphql');
const _ = require('lodash');

const axios = require('axios');
const { Content, InputContentData } = require('../../types');

const CONTENT_DATA_CHANGE = {
  type: Content,
  description: 'sends `command.CONTENT_DATA_CHANGE`',
  args: {
    data: {type: new GraphQLNonNull(InputContentData)},
    index: {type: new GraphQLNonNull(GraphQLInt)}
  },
  resolve: (rootValue, args) => {
    let type = '';

    if (_.findKey(args, 'title')) {
      type = 'command.CONTENT_TITLE_CHANGE';

    } else if (_.findKey(args, 'description')) {
      type = 'command.CONTENT_DESCRIPTION_CHANGE';
    } else {
      console.log('could not find property');
    }
    const body = {
      type,
      payload: args
    };
    return axios.post('http://content-cmd/', body)
                .then( res => res.data)
                .catch(res => { throw JSON.stringify(res.data); });
  }
};

module.exports = CONTENT_DATA_CHANGE;
