const { GraphQLObjectType, GraphQLInt } = require('graphql');
const EmployeeImportSaga = new GraphQLObjectType({
  name: 'EmployeeImportSaga',
  description: 'Employee description',
  fields: () => ({
    employeesCreated: {
      type: GraphQLInt,
      description: 'Number of Employees created'
    },
    errorCount: {
      type: GraphQLInt,
      description: 'Number of errors'
    }
  })
});

module.exports = EmployeeImportSaga;
