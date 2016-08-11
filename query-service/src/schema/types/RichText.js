const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = require('graphql');

const EntityRange = new GraphQLObjectType({
  name: 'RichTextEntityRange',
  description: 'The `key` value corresponds to the key of the entity in the `entityMap` of a `ComposedText` object',
  fields: () => ({
    key: {type: GraphQLFloat},
    offset: {type: GraphQLFloat},
    length: {type: GraphQLFloat},
  })
});

const InlineStyleRange = new GraphQLObjectType({
  name: 'RichTextInlineStyleRange',
  description: 'A plain object representation of an inline style range',
  fields: () => ({
    style: {type: GraphQLString},
    offset: {type: GraphQLFloat},
    length: {type: GraphQLFloat},
  })
});

const BlockType = new GraphQLObjectType({
  name: 'RichTextBlock',
  fields: () => ({
    key: {
      type: GraphQLString,
      description: 'Key of the block'
    },
    text: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
      description: 'Should be one of these values: https://github.com/facebook/draft-js/blob/e2037984f32de4d3c267f6d43e0588fd124c0168/src/model/constants/DraftBlockType.js'
    },
    depth: {
      type: GraphQLFloat,
    },
    inlineStyleRanges: {
      type: new GraphQLList(InlineStyleRange),
    },
    entityRanges: {
      type: new GraphQLList(EntityRange),
    },
  })
});


const RawDraftEntity = new GraphQLObjectType({
  name: 'RichTextRawDraftEntity',
  fields: () => ({
    type: {
      type: GraphQLString,
      description: 'Please JSON.parse() this on the client',
      resolve: (rawDraftEntity) => JSON.stringify(rawDraftEntity.type) // Hack because this is basically type any
    },
    mutability: {
      type: GraphQLString,
      description: 'Please JSON.parse() this on the client',
      resolve: (rawDraftEntity) => JSON.stringify(rawDraftEntity.mutability) // Hack because this is basically type any
    },
  })
});



const RichText = new GraphQLObjectType({
  name: 'RichText',
  description: 'Represents a composed document as vanilla JS objects. https://github.com/facebook/draft-js/blob/67c5e69499e3b0c149ce83b004872afdf4180463/src/model/encoding/RawDraftContentState.js',
  fields: () => ({
    blocks: {
      type: new GraphQLList(BlockType),
      description: 'A plain object representation of a ContentBlock',
    },
    entityMap: {
      type: new GraphQLList(RawDraftEntity),
      description: 'A plain object representation of a ContentBlock',
    }
  })
});

module.exports = RichText;
