var express = require("express");
var router = express.Router();
var leaderboard = require('../models/leaderboardModel.js')

/* GET home page. */
router.get("/", function(req, res, next) {
  getLeaderboard().then((response, error) => {
    if(error) {

    } else {

      res.json(response);

    }
  })
});

function getLeaderboard() {
  return new Promise(function(resolve, reject) {
    leaderboard.find({}, null, {sort: {score: -1}}, function(err, doc) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

module.exports = router;
