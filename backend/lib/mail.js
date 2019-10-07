const {FUTURE} = require('./consts');
const mailgun = require('./settings').mailgun;
const destination = require('./settings').notificationEmail;

const map = require('lodash/fp/map');
const toPairs = require('lodash/fp/toPairs');
const compose = require('lodash/fp/compose');
const join = require('lodash/fp/join');

const mapToTable = compose(
    join(' '),
    map(row => `<tr>${row}</tr>`),
    map(pair => `<td>${pair[0]}</td><td>${pair[1]}</td>`),
    toPairs
);

const mg = require('mailgun-js')({apiKey: mailgun.apiKey, domain: mailgun.domain});

const sendMail = (type, orderData) => {
    const data = {
        to: destination,
        from: `[SwissX Exchange] <${mailgun.user}>`,
        subject: `[SwissX Exchange]: ${type === FUTURE ? 'Futures Order' : 'Order' } has been submitted`,
        html: `<h1>${type} ${orderData.id} has been submitted:</h1><br/>`
            + '<table>'
            + mapToTable({ date: new Date(), ...orderData})
            +'</table>'
    };

    mg.messages().send(data, function (error) {
        if ( ! error )  {
            console.info('An e-mail has been sent to ' + destination + ` with ${type} notification.`);
        } else {
            console.error(`Can not notify ${destination} about created ${type} because of ${error}`);
            console.debug(`Mail body: ${JSON.stringify({orderData, data})}`);
        }
    });
};


module.exports = {
    createMailNotificator : () => (whateverType, whateverData) => {
        console.log(`${whateverType} has been creared: ${JSON.stringify(whateverData)}`);
        sendMail(whateverType, whateverData);
    }
};
