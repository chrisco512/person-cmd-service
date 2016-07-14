'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const koa = require('koa');
const jwt = require('koa-jwt');
const util = require('util');
const router = require('koa-router')();
const { pageNotFound, error, unauthorized, unprotected } = require('./middlewares');
const config = require('./config');
const co = require('co');
const cors = require('koa-cors');
const log = require('./log');
const { setupHandlers } = require('./server_utils');
const { employeeRecordImportSaga } = require('./routes');
const app = module.exports = koa();
const port = process.env.PORT || config.port || 8080;

const IncomingForm = require('formidable');
const body = require('koa-better-body');


setupHandlers();

app.use(cors());
app.use(pageNotFound);
app.use(error);
app.use(unauthorized);
app.use(unprotected);

router.get('/', function *() {
	this.response.status = 200;
	this.body = 'Demo Application | Saga Service operational.';
});

router.post('/employee_record_import',
  body({
    IncomingForm: new IncomingForm(),
    onerror: (err, ctx) => {
	    log.warn('Error in koa body - ', err, '. With context - ', ctx);
      throw err;
    }
  }), employeeRecordImportSaga);

app.use(router.routes());
app.use(router.allowedMethods());

//START UP
co(function* () {
	app.listen(port, () => {
		log.info(`Listening on port: ${port}`);
	});
});
