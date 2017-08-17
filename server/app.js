//SETUP
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var port = process.env.PORT || 3001;
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
const MongoStore = require("connect-mongo")(session);
var socketRooms = require("./socket/room-management");
var imagePrompts = require("./socket/image-prompt-management");

figure this out for windows
if (!process.env.NODE_ENV) {
  var config = require("./config.js");
}


app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//DONT THINK THIS IS NEEDED ANYMORE
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

//Mongoose db setup
var mongoUser = process.env.DB_USERNAME || config.getMongoUser();
var mongoPass = process.env.DB_PASSWORD || config.getMongoPass();

mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@ds047335.mlab.com:47335/draw-dash`);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection eror:"));
db.once("open", function() {
  console.log("MongoDB Database connected");
});

//passport setup
app.use(
  session({
    secret: "123secret",
    saveUninitialized: true /*process.env.PASSPORT_SECRET*/,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

//COMMENTED OUT FOR DEV SO IT DOESN'T LOAD THE BUILD FILE
// app.use(express.static( __dirname + '/../build'));
// app.use(express.static( __dirname + 'build'));

//SOCKET SETUP
const server = require("http").createServer(app);
const io = require("socket.io")(server);

//ROUTES
app.use("/api/authenticate", require("./routes/authenticate"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/authCheck", require("./routes/authCheck"));
app.use("/api/lobby", require("./routes/lobby")(io, socketRooms));
app.use("/api/room", require("./routes/room")(io, socketRooms, imagePrompts));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

//CATCHALL FOR SERVING REACT BUNDLE
// app.get('*', (req, res)=> {
//   console.log('get');
//   console.log(path.join(__dirname+'/../build/index.html'));
//   res.sendFile(path.join(__dirname+'/../build/index.html'));
// })

//launch
server.listen(port, function() {
  console.log(`DrawDash Server listening on port ${port}!`);
});
