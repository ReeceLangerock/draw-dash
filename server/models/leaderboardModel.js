const mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;

//leaderboard schema
var leaderboardSchema = mongoose.Schema({
  _id: String,
  UID: String,
  displayName: String,
  score: Number
});

//Create new leaderboard entry
leaderboardSchema.methods.newLeaderboardItem = function(data) {
  var newItem = new leaderboardModel({
    _id: new ObjectID(),
    UID: data.UID,
    displayName: data.displayName,
    score: data.score
  });

  newItem.save(function(err) {
    if (err) {
      throw err;
    } else {
      return "success";
    }
  });
};

var leaderboardModel = mongoose.model("leaderboardItem", leaderboardSchema, "leaderboard");
module.exports = leaderboardModel;
