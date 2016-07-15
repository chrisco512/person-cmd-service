const config = require('./config');
const bus = require('servicebus').bus({ url: 'amqp://rabbit/' + '?heartbeat=60' });
const nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');

let transporter = nodemailer.createTransport(ses({
        accessKeyId: 'AKIAINFX7ENSQB3GYXYA',
        secretAccessKey: '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',
        region: 'us-west-2'
}));

bus.subscribe('#', (event) => {
  	console.log('SOCKET SERVICE RECEIVED: ', event);

        if(event.type === "person.PERSON_CREATED") {
                sendEmail(event.payload)
        }
});


function sendEmail(payload) {
        console.log(`sending mail to, ${payload.firstName} ${payload.lastName}`);

        transporter.sendMail({
                from: 'team@ultilabs.xyz',
                to: payload.email,
                subject: "Welcome to CultureShock!",
                html: "You have been assimilated"
        }, function(error, info) {
                if (error) {
                        console.log(`OH NOES! ERROR: ${error}`);
                        return;
                }

                console.log('Message sent: ', info);
        });
}
