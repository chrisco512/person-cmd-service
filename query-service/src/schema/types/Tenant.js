const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = require('graphql');
const Employee = require('./Employee');
const TenantContact = require('./TenantContact');
const store = require('../../store');

const Tenant = new GraphQLObjectType({
  name: 'Tenant',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'ID of the tenant'
    },
    name: {
      type: GraphQLString,
      description: 'Name of the tenant'
    },
    address: {
      type: GraphQLString,
      description: 'Address of the tenant'
    },
    contact: {
      type: TenantContact,
      description: 'Main contact for the tenant'
    },
    employees: {
      type: new GraphQLList(Employee),
      resolve: (tenant, args) => {
        return store.getState().employees
          .filter(employee => employee.tenantID === tenant._id);
      }
    }
  })
});

module.exports = Tenant;
