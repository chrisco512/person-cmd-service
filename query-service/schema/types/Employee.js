const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');
const Employee = new GraphQLObjectType({
  name: 'Employee',
  description: 'Employee description',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull( GraphQLString ),
      description: 'ID of the employee'
    },
    eeid: {
      type: GraphQLInt,
      description: 'Tenant-provided ID of the employee'
    },
    name: {
      type: GraphQLString,
      description: 'Name of the employee'
    },
    phone: {
      type: GraphQLInt,
      description: 'Phone number of the employee'
    },
    email: {
      type: GraphQLString,
      description: 'Email address of the employee'
    }
  })
});

module.exports = Employee;
