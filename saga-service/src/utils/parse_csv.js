const { Converter } = require("csvtojson");
const fs = require('fs');

function parse(path, tenantID, type) {
 	return new Promise((resolve, reject) => {
	  let employees = [];

 		const converter = new Converter({});
 		//record_parsed will be emitted each csv row being processed
 		converter.on("record_parsed", employee => {
		  employees.push(employee);
 			//console.log('Employee received: ', employee);
 			//const { eeid, name, phone, email } = employee;
 			//const command = {
 			//	type,
 			//	payload: {
 			//		eeid,
 			//		tenantID,
 			//		name,
 			//		phone,
 			//		email
 			//	}
 			//};

 			//commandHandler(command).then(event => {
 			//	employeesCreated++;
 			//}).catch( err => {
 			//	errors++;
 			//});
 		});

 		//end_parsed will be emitted once parsing finished
 		converter.on("end_parsed", () => {
 			fs.unlink(path);
		  resolve(employees);
 			//resolve({
 			//	employeesCreated,
 			//	errors
 			//});
 		});

 		fs.createReadStream(path).pipe(converter);
 	});
 }

 module.exports = parse;