const PERSON = require('./person');
const USER = require('./user');
const TENANT = require('./tenant');
const SAGA = require('./saga');

module.exports = {
  USER_CREATE: USER.CREATE,
  PERSON_CREATE: PERSON.CREATE,
  PERSON_FIRST_NAME_CHANGE: PERSON.FIRST_NAME_CHANGE,
  PERSON_LAST_NAME_CHANGE: PERSON.LAST_NAME_CHANGE,
  PERSON_EMAIL_CHANGE: PERSON.EMAIL_CHANGE,
  PERSON_PHONE_CHANGE: PERSON.PHONE_CHANGE,
  PERSON_CARRIER_CHANGE: PERSON.CARRIER_CHANGE,
  TENANT_CREATE: TENANT.CREATE,
  EMPLOYEE_IMPORT_SAGA: SAGA.EMPLOYEE_IMPORT,
};


// module.exports = {
//   USER_CREATE: require('./user_create'),
//   PERSON_CREATE: require('./person_create'),
//   TENANT_CREATE: require('./tenant_create'),
//   EMPLOYEE_IMPORT_SAGA: require('./employee_import_saga'),
// };
