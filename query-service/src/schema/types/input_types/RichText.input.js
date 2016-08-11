const { GraphQLString, GraphQLInputObjectType, GraphQLList, GraphQLFloat } = require('graphql');

const InputRichText = new GraphQLInputObjectType({
  name: 'InputRichText',
  fields: () => ({
    blocks: { type: new GraphQLList(new GraphQLInputObjectType({
      name: 'InputRichTextBlock',
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
          type: new GraphQLList(new GraphQLInputObjectType({
            name: 'InputRichTextInlineStyleRange',
            fields: () => ({
              style: {type: GraphQLString},
              offset: {type: GraphQLFloat},
              length: {type: GraphQLFloat},
            })
          })),
        },
        entityRanges: {
          type: new GraphQLList(new GraphQLInputObjectType({
            name: 'InputRichTextEntityRange',
            fields: () => ({
              style: {type: GraphQLString},
              offset: {type: GraphQLFloat},
              length: {type: GraphQLFloat},
            })
          })),
        },
      })
    }))},
    entityMap: { type: new GraphQLList(new GraphQLInputObjectType({
      name: 'InputRichTextEntityMap',
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
    }))}
  })
});

module.exports = InputRichText;
