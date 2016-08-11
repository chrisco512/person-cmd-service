const ObjectTypes = {
  Analytics: require('./Analytics'),
  Employee: require('./Employee'),
  Person: require('./Person'),
  Tenant: require('./Tenant'),
  TenantContact: require('./TenantContact'),
  User: require('./User'),
  Manager: require('./Manager'),
  CarrierEnum: require('./CarrierEnum'),
  ContentTypeEnum: require('./ContentTypeEnum'),
  EmployeeImportSaga: require('./EmployeeImportSaga'),
  Pillar: require('./Pillar'),
  Content: require('./Content'),
  Point: require('./Point'),
  ContentData: require('./ContentData'),
  RichText: require('./RichText'),
  PointDate: require('./PointDate'),
};

const InputTypes = require('./input_types');
// const EnumTypes = require('./enum_types');

const exportedTypes = Object.assign({}, ObjectTypes, InputTypes);

module.exports = exportedTypes;
