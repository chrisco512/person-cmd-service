const { GraphQLEnumType } = require('graphql');

const ContentTypeEnum = new GraphQLEnumType({
  name: 'ContentTypeEnum',
  description: 'Enumeration of the different types of content',
  values: {
    VIDEO: {
      value: 'video'
    },
    QUOTE: {
      value: 'quote'
    },
    LUNCH: {
      value: 'lunch'
    }
  }
});

module.exports = ContentTypeEnum;
