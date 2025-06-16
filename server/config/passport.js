const passportAtlassianOauth2 = require('passport-atlassian-oauth2');
const passport = require('passport');

passport.use(new passportAtlassianOauth2({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['read:jira-work', 'read:jira-user']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = { accessToken, profile };
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
