var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  if(req.user) {

    res.json(req.user)
  } else {
    res.json(false);
  }
});

module.exports = router;
