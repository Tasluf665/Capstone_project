const MongoStore = require('connect-mongo');

module.exports = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
    }),
    cookie: process.env.NODE_ENV === 'production'
        ? {
            secure: true,        // Ensure cookies are sent over HTTPS in production
            httpOnly: true,      // Prevent client-side JavaScript from accessing cookies
            sameSite: 'none',    // Allow cookies to be sent across different origins
        }
        : null,                  // No cookie settings in development
};