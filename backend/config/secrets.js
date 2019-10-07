module.exports = {

    db: process.env.MONGODB || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://swissx:swissx@localhost:27017/memberzone?authMechanism=DEFAULT&authSource=memberzone',

    sessionSecret: process.env.SESSION_SECRET || 'change this',

    mailgun: {
        apiKey: process.env.MAILGUN_API_KEY || 'b9088f4660717691939cd501965f1860-19f318b0-20194c92',
        domain: process.env.MAILGUN_DOMAIN || 'b9088f4660717691939cd501965f1860-19f318b0-20194c92'
    },

    stripeOptions: {
        apiKey: process.env.STRIPE_KEY || 'sk_test_1TOLy25t248fEbm3JhLWSMyo00TT0zk84s',
        stripePubKey: process.env.STRIPE_PUB_KEY || 'pk_test_hAOv1PG56mnQOmBotkCoQT3X009tKYrCqs',
        defaultPlan: 'annual',
        plans: ['annual', 'halfyear', 'three-months', 'monthly'],
        planData: {
            'annual': {
                name: 'Annual - save 30%',
                price: 840,
                period: 'year'
            },
            'six-months': {
                name: 'Half Year - save 20%',
                price: 480,
                period: '6 months'
            },
            'quarter': {
                name: 'Quarter - save 10%',
                price: 270,
                period: '3 months'
            },
            'basic': {
                name: 'Monthly',
                price: 100,
                period: '1 month'
            }
        }
    },

    googleAnalytics: process.env.GOOGLE_ANALYTICS || ''
};
