const MongoStore = require('connect-mongo');

module.exports = {
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: true,        // Ensure cookies are sent over HTTPS
        httpOnly: true,      // Prevent client-side JavaScript from accessing cookies
        sameSite: 'none',    // Allow cookies to be sent across different origins
    },
};