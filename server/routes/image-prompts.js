var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ 'image-prompts': ['Fish wearing a hat', 'A blue duck', 'Chameleon', 'Moon made of cheese', 'Bull in a china shop']});

});


module.exports = router;
