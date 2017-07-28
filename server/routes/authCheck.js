var express = require("express");
var router = express.Router();


router.get("/", function(req, res, next) {

  //Serves for client side check that user is authorized
  if (req.user) {
    res.json(req.user);
  } else {
    res.json(false);
  }
});

module.exports = router;
