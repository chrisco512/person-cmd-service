const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLBoolean } = require('graphql');
const Content = require('./Content');

const Pillar = new GraphQLObjectType({
  name: 'Pillar',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the person'
    },
    tenantId: {
      type: GraphQLString,
      description: 'ID of the tenant'
    },
    name: {
      type: GraphQLString,
      description: 'Name of pillar'
    },
    content: {
      type: new GraphQLList(Content), //List of content types
      description: 'Array of content ids'
      // resolve: (pillar) => {
      //   // TODO: actually create the contents stuff
      //   const contents = store.getState().contents;
      //   return pillar.content.map( (contentId) => {
      //     // TODO error check.
      //     return contents.filter(content => content._id === contentId )[0];
      //   });
      // }
    },
    isSelected: {
      type: GraphQLBoolean,
      description: 'If selected as a pillar for that tenant'
    },
    isDeleted: {
      type: GraphQLBoolean,
      description: 'If pillar has been deleted'
    }
  })
});

module.exports = Pillar;
