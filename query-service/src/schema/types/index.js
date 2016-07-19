const ObjectTypes = {
  Employee: require('./Employee'),
  Person: require('./Person'),
  Tenant: require('./Tenant'),
  TenantContact: require('./TenantContact'),
  User: require('./User'),
  Manager: require('./Manager'),
  CarrierEnum: require('./CarrierEnum'),
  EmployeeImportSaga: require('./EmployeeImportSaga')
};

const InputTypes = require('./input_types');

const exportedTypes = Object.assign({}, ObjectTypes, InputTypes);

module.exports = exportedTypes;
