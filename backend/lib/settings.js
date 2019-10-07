module.exports = {

    mailgun: {
        apiKey: process.env.MAILGUN_API_KEY || 'your account',
        domain: process.env.MAILGUN_DOMAIN || 'will be disabled if this appears anywhere',
        user: process.env.MAILGUN_USER || 'even if it is sandbox with limited list of recipient emails',
    },

    notificationEmail: 'some email address to sent spam notifications to'
};
