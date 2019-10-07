const withFonts = require('next-fonts');
const withCss = require('@zeit/next-css');

module.exports = withCss(withFonts({
    serverRuntimeConfig: {
        // Will only be available on the server side
        publicSecret: 'secret',
        privateSecret: process.env.PRIVATE_SECRET || 'private', // Pass through env variables
    },
}));
