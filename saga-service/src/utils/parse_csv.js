const { Converter } = require("csvtojson");
const fs = require('fs');

function parse(path, tenantId, type) {
 	return new Promise((resolve, reject) => {
	  let employees = [];

 		const converter = new Converter({});
 		//record_parsed will be emitted each csv row being processed
 		converter.on("record_parsed", employee => {
		  employees.push(employee);
 		});

 		//end_parsed will be emitted once parsing finished
 		converter.on("end_parsed", () => {
 			fs.unlink(path);
		  resolve(employees);
 		});

 		fs.createReadStream(path).pipe(converter);
 	});
 }

 module.exports = parse;
