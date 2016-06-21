// 'use strict';
const app = require('koa')();
const path = require('path');
const IncomingForm = require('formidable');
const body = require('koa-better-body');
const { Converter } = require("csvtojson");
const fs = require('fs');
const config = require('./config');
const bus = require('servicebus').bus({ url: config.servicebus.uri + "?heartbeat=60" });
const util = require('util');

// const actions = require('./actions');
const store = require('./store/store');

const form = new IncomingForm();

// form.keepExtensions = true;
// form.encoding = 'utf-8';
// form.uploadDir = path.join(__dirname);

// form.on('field', function (name, value) {
// 	console.log(name, JSON.stringify(value)); // name is user, value is test
// });

// form.on('file', function (name, file) {
// 	console.log(name); // => foo
// 	console.log(file); // => README.md
// 	console.log(file.path); // => full filepath to where is uploaded

// 	parseRecords(file.path);
// });

// form.on('end', function (name, file) {
// 	console.log('finish parse');
// });

// function parseRecords(path) {
// 	const employees = [];
// 	var converter = new Converter({});

// 	//record_parsed will be emitted each csv row being processed
// 	converter.on("record_parsed", function (employee) {
// 		// create an employee imported action


// 		employees.push(employee);


// 		// let tenantAction = actions.tenantEmployeeDataImport(employee);

// 		// console.log('Employee Data Action: ', util.inspect(tenantAction));
// 		// bus.publish(tenantAction.type, tenantAction.payload);
// 	});

// 	//end_parsed will be emitted once parsing finished
// 	converter.on("end_parsed", function () {
// 		fs.unlink(path);
// 	});

// 	fs.createReadStream(path).pipe(converter);
// }

module.exports = form;
