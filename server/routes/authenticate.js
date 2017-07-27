//setup
var SlackStrategy = require("passport-slack").Strategy;
var jwt = require("jsonwebtoken");
var express = require("express");
var passport = require("passport");
var router = express.Router();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var redirectRoute;
if (!process.env.NODE_ENV) {
  var config = require("../config.js");
  redirectRoute = "http://localhost:3000/";
} else {
  redirectRoute = "https://draw-dash.herokuapp.com/";
}

router.use(require("body-parser").urlencoded({ extended: true }));
router.use(cookieParser());
router.use(session({ secret: "CHANGE-ME-LATER" }));
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new SlackStrategy(
    {
      clientID: process.env.CLIENT_ID || config.getClientID(),
      clientSecret: process.env.CLIENT_SECRET || config.getClientSecret()
    },
    (accessToken, refreshToken, profile, done) => {
      //const userWithToken = addJWT(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// path to start the OAuth flow
router.get("/", passport.authenticate("slack", { session: true }));

// OAuth callback url
router.get("/callback", passport.authenticate("slack", { failureRedirect: "/" }), function(req, res) {
  res.redirect(redirectRoute);
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
