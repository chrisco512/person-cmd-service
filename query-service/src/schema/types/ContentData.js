const { GraphQLObjectType, GraphQLString } = require('graphql');
const RichText = require('./RichText');

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
    // For type: RichText
    richtext: {
      type: RichText,
      description: 'Rich text data'
    },
    // For type: Lunch
    recipient: {
      type: GraphQLString,
      description: 'Full name of the lunch meeting recipient'
    },
    recipientPosition: {
      type: GraphQLString,
      description: 'Position of the recipient for the lunch meeting'
    }
  })
});

module.exports = ContentData;
