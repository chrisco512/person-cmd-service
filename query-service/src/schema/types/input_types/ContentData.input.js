const { GraphQLString, GraphQLInputObjectType } = require('graphql');
const InputRichText = require('./RichText.input');

const InputContentData = new GraphQLInputObjectType({
  name: 'InputContentData',
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
    recipient: {
      type: GraphQLString,
      description: 'Full name of the lunch meeting recipient'
    },
    recipientPosition: {
      type: GraphQLString,
      description: 'Position of the recipient for the lunch meeting'
    },
    // For type: Richtext
    richtext: {
      type: InputRichText,
      description: 'Rich Text content'
    },
  })
});

module.exports = InputContentData;
