const ObjectTypes = {
  Employee: require('./Employee'),
  Person: require('./Person'),
  Tenant: require('./Tenant'),
  TenantContact: require('./TenantContact'),
  User: require('./User'),
  CarrierEnum: require('./CarrierEnum'),
  ContentTypeEnum: require('./ContentTypeEnum'),
  EmployeeImportSaga: require('./EmployeeImportSaga'),
  Pillar: require('./Pillar'),
  Content: require('./Content')
};

const InputTypes = require('./input_types');
// const EnumTypes = require('./enum_types');

const exportedTypes = Object.assign({}, ObjectTypes, InputTypes);

module.exports = exportedTypes;
