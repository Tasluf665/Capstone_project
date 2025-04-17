const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start OAuth login
router.get('/atlassian', passport.authenticate('atlassian'));

// Callback route after successful login
router.get('/atlassian/callback', passport.authenticate('atlassian', { failureRedirect: '/' }),
    function (req, res) {
        const redirectUrl = req.session.returnTo || '/sustainability-backlog';
        delete req.session.returnTo; 
        res.redirect(`${process.env.FRONTEND_URL}${redirectUrl}`);
    });

// Route to check authentication status
router.get('/check-auth', (req, res) => {
    if (req.user) {
        res.json({ authenticated: true });
    } else {
        res.json({ authenticated: false });
    }
});

// Route to log out the user
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid');  // Clear the session cookie
        res.send({ message: 'Logged out successfully' });
    });
});

router.post('/store-url', (req, res) => {
  req.session.returnTo = req.body.returnTo;
  res.json({ success: true });
});

module.exports = router;
