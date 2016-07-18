const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const ContentTypeEnum = require('./ContentTypeEnum');

const ContentData = new GraphQLObjectType({
  name: 'ContentData',
  fields: () => ({
    // For type: Video
    title: {
      type: GraphQLString,
      description: 'Title of the video'
    },
    description: {
      type: GraphQLString,
      description: 'Description of the video'
    },
    url: {
      type: GraphQLString,
      description: 'Url of the video'
    },
    // For type: Quote
    quote: {
      type: GraphQLString
    },
    author: {
      type: GraphQLString,
      description: 'Author of the quote'
    },
    // For type: Lunch
    fullName: {
      type: GraphQLString,
      description: 'Full name of the lunch meeting recipient'
    },
    position: {
      type: GraphQLString,
      description: 'Position of the recipient for the lunch meeting'
    }
  })
});

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
    }
  })
});

module.exports = Content;
