//SETUP
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var port = process.env.PORT || 3001;
var app = express();
//var config = require("./config.js");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");

var morgan = require("morgan");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// var mongoUser = process.env.DB_USERNAME;// || config.getMongoUser();
// var mongoPass = process.env.DB_PASSWORD;// || config.getMongoPass();
//
// mongoose.connect(
//   `mongodb://${mongoUser}:${mongoPass}@ds131340.mlab.com:31340/libru`
// );
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection eror:"));
// db.once("open", function() {
//   console.log("connected");
// });

//passport setup
app.use(session({ secret: "123secret",saveUninitialized: true, /*process.env.PASSPORT_SECRET*/ }));
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));



//ROUTES
app.use("/api", require("./routes/index"));
app.use("/api/authenticate", require("./routes/authenticate"));
app.use("/api/image-prompts", require("./routes/image-prompts"));


//launch
app.listen(port, function() {
  console.log(`DrawDash Server listening on port ${port}!`);
});
