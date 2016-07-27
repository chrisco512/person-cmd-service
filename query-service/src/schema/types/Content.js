const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } = require('graphql');
const ContentTypeEnum = require('./ContentTypeEnum');
const ContentData = require('./ContentData');

const Content = new GraphQLObjectType({
  name: 'Content',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the content'
    },
    pillarId: {
      type: GraphQLString,
      description: 'ID of the pillar'
    },
    type: {
      type: ContentTypeEnum,
      description: 'Type of content'
    },
    data: {
      type: ContentData,
      description: 'All of the different types of data a content can have'
    },
    isDeleted: {
      type: GraphQLBoolean,
      description: 'Is the content deleted or not?'
    }
  })
});

module.exports = Content;
