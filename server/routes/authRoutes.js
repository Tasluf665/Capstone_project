const express = require("express");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");
const User = require("../models/user");
const sign = require('jwt-encode');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const SECRET = process.env.SESSION_SECRET;

// Route to start OAuth login
router.get("/atlassian", passport.authenticate("atlassian"));

// Callback route after successful login
router.get(
  "/atlassian/callback",
  passport.authenticate("atlassian", { failureRedirect: "/" }),
  function (req, res) {
    const redirectUrl = req.session.returnTo || "/sustainability-backlog";
    delete req.session.returnTo;
    res.redirect(`${process.env.FRONTEND_URL}${redirectUrl}`);
  }
);

// Route to check authentication status
router.get("/check-auth", (req, res) => {
  if (req.user) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

// Route to log out the user
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.send({ message: "Logged out successfully" });
  });
});

router.post("/store-url", (req, res) => {
  req.session.returnTo = req.body.returnTo;
  res.json({ success: true });
});

router.get("/google/signin", (req, res) => {
  res.redirect(
    `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=openid%20profile%20email&access_type=offline`
  );
});

router.get("/google/callback", (req, res) => {
  const { code } = req.query;

  const payload = {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  };
  axios
    .post("https://accounts.google.com/o/oauth2/token", payload)
    .then((response) => {
      const { access_token } = response.data;

      axios
        .get("https://www.googleapis.com/oauth2/v1/userinfo", {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((response) => {
          const { id, email, given_name, family_name, picture } = response.data;

          // Check if user already exists in the database
          User.findOne({ googleId: id })
            .then((existingUser) => {
              if (existingUser) {
                // User already exists, update their info
                existingUser.name = given_name;
                existingUser.lastName = family_name;
                existingUser.email = email;
                existingUser.photo = picture;
                existingUser.save();
              } else {
                // Create a new user
                const newUser = new User({
                  name: given_name,
                  lastName: family_name,
                  email: email,
                  googleId: id,
                  photo: picture,
                });
                newUser.save();
              }
            })
            .catch((error) => {
              console.error("Error saving user to database:", error);
              return res.status(500).send("Error saving user to database");
            });

          // find _id using googleId
          User.findOne({ googleId: id }).then((user) => {
            if (!user) {
              return res.status(404).send("User not found");
            } else {
              const payload = sign({
                status: 200,
                message: "Login successful",
                data: {
                  id: user.id,
                  name: user.name,
                  lastName: user.lastName,
                  email: user.email,
                  photo: user.photo,
                },
              }, SECRET);
              res.redirect(
                `${process.env.FRONTEND_URL}?token=${payload}`
              );
            }
          });
        })
        .catch((error) => {
          res.status(500).send("Error fetching user info");
        });
    })
    .catch((error) => {
      res.status(500).send("Error authenticating with Google");
    });
});

module.exports = router;
