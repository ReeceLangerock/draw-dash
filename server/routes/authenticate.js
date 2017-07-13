//setup
var SlackStrategy = require("passport-slack").Strategy;
var jwt = require("jsonwebtoken");
var express = require("express");
var passport = require("passport");
var router = express.Router();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var config = require("../config.js");
router.use(require("body-parser").urlencoded({ extended: true }));
router.use(cookieParser());
router.use(session({ secret: "CHANGE-ME-LATER" }));
router.use(passport.initialize());
router.use(passport.session());

// Look into adding JWT later on --------------------
// function addJWT(user) {
//   const token = jwt.sign({ email: "test" }, config.getJwt(), {
//     expiresIn: 60000
//   });
//
//   return Object.assign({}, user, { token });
// }

// setup the strategy using defaults
passport.use(
  new SlackStrategy(
    {
      clientID: config.getClientID(),
      clientSecret: config.getClientSecret()
    },
    (accessToken, refreshToken, profile, done) => {
      //const userWithToken = addJWT(profile);
      console.log(profile);
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
router.get(
  "/callback",
  passport.authenticate("slack", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("http://localhost:3000/");
  }
);

module.exports = router;
