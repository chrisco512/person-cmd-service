const config = require('./config');
const bus = require('servicebus').bus({ url: `${config.servicebus.uri}?heartbeat=60` });
const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');

const transporter = nodemailer.createTransport(ses({
        accessKeyId: 'AKIAINFX7ENSQB3GYXYA',
        secretAccessKey: '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',
        region: 'us-west-2'
}));

bus.subscribe('#', (event) => {
  	console.log('SOCKET SERVICE RECEIVED: ', event);

        if(event.type === 'person.PERSON_CREATED') {
                sendEmail(event.payload);
        }
});


function sendEmail(payload) {
        console.log(`sending mail to, ${payload.firstName} ${payload.lastName}`);

        transporter.sendMail({
                from: 'culture@ultilabs.xyz',
                to: payload.email,
                subject: 'Welcome to CultureShock!',
                html: `
                &#128293; Welcomt to Culture Shock! &#128293;
                <br/>
                <br/>
                <strong>You have been assimilated</strong>
                <p>Please go to <a href="culture.ultilabs.xyz"> this site </a> to finish your registration.</p>
                `
        }, function(error, info) {
                if (error) {
                        console.log(`OH NOES! ERROR: ${error}`);
                        return;
                }

                console.log('Message sent: ', info);
        });
}
