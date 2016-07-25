const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull
} = require('graphql');

const InputTenantContact = new GraphQLInputObjectType({
  name: 'InputTenantContact',
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of the contact for the tenant'
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Email of the contact for the tenant'
    },
    phone: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Phone number of the contact for the tenant'
    }
  })
});

module.exports = InputTenantContact;
