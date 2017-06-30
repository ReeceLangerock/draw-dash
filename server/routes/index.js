var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');
  console.log("USER INFO IN REQ.USER", req.user);
  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  },
  {
    id: 3001,
    username: "reece"
  }]);
});

module.exports = router;
