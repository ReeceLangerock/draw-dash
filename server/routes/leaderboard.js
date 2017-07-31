var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var leaderboard = require("../models/leaderboardModel.js");
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);
router.use(bodyParser.json());

//get leaderboard data
router.get("/", function(req, res, next) {
  getLeaderboard().then((response, error) => {
    if (error) {
      res.json(false);
    } else {
      res.json(response);
    }
  });
});

router.post("/", function(req, res, next) {

  var points = req.body.points;
  var user = req.body.user;
  findUser(user.UID, points).then((response, error) => {
    if (error) {
      res.json({ error: "error" });
    } else if (response === "NOT_FOUND") {
      leaderboard.schema.methods.newLeaderboardItem(user, points);
    }
  });
});

function findUser(UID, points) {
  return new Promise(function(resolve, reject) {
    leaderboard.findOneAndUpdate(
      {
        UID: UID
      },
      {
        $inc: {
          score: points
        }
      },
      function(err, doc) {
        if (err) {
          reject(err);
        } else if (doc) {
          resolve("FOUND");
        } else {
          resolve("NOT_FOUND");
        }
      }
    );
  });
}

function getLeaderboard() {
  return new Promise(function(resolve, reject) {
    leaderboard.find({}, null, { sort: { score: -1 } }, function(err, doc) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

module.exports = router;
