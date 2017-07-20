const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

var leaderboardSchema = mongoose.Schema({
  _id: String,
  UID: String,
  displayName: String,
  score: Number

});

leaderboardSchema.methods.newLeaderboardItem = function(id, data) {
  var newLeaderboardItem = new leaderboardItemModel({
    UID: data.UID,
    displayName: date.displayName,
    score: data.score

  });

  newLeaderboardItem.save(function(err) {
    if (err) {
      throw err;
    } else {
      return 'success';
    }
  });
};

var leaderboardModel = mongoose.model('leaderboardItem', leaderboardSchema, 'leaderboard');
module.exports = leaderboardModel;
