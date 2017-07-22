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

/* GET home page. */
router.get("/", function(req, res, next) {
  getLeaderboard().then((response, error) => {
    if (error) {
    } else {
      res.json(response);
    }
  });
});

router.post("/", function(req, res, next) {
  console.log('post', req.body);
  //temporary points assignment
  var points = 1;
  var user = req.body
  findUser(user.UID, points).then((response, error) => {
    if (error) {
      res.json({error: "error"});
    } else if (response === "NOT_FOUND") {
      leaderboard.schema.methods.newLeaderboardItem(req.body, points);
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
