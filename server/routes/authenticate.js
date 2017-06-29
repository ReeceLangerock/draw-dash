//setup
var SlackStrategy = require('passport-slack').Strategy
var express = require("express");
var passport = require("passport");
var router = express.Router();
var session = require("express-session");
var config = require("../config.js");
router.use(session({ secret: "CHANGE-ME-LATER" }));
router.use(passport.initialize());
router.use(passport.session());




// setup the strategy using defaults
passport.use(new SlackStrategy({
    clientID: config.getClientID(),
    clientSecret: config.getClientSecret(),
  }, (accessToken, refreshToken, profile, done) => {
    // optionally persist profile data
    done(null, profile);
  }
));


router.use(require('body-parser').urlencoded({ extended: true }));

// path to start the OAuth flow
router.get('/', passport.authorize('slack'));

// OAuth callback url
router.get('/callback',
  passport.authorize('slack', { failureRedirect: '/login' }),
  (req, res) => res.redirect('http://localhost:3000')
);

module.exports = router;
