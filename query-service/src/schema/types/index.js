const ObjectTypes = {
  Employee: require('./Employee'),
  Person: require('./Person'),
  Tenant: require('./Tenant'),
  TenantContact: require('./TenantContact'),
  User: require('./User'),
  CarrierEnum: require('./CarrierEnum'),
  EmployeeImportSaga: require('./EmployeeImportSaga'),
  Pillar: require('./Pillar'),
  Content: require('./Content')
};

const InputTypes = require('./input_types');

const exportedTypes = Object.assign({}, ObjectTypes, InputTypes);

module.exports = exportedTypes;
