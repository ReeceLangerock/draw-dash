var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var data = { 'image-prompts': ['Fish wearing a hat', 'A blue duck', 'Chameleon', 'Moon made of cheese', 'Bull in a china shop']}
  if(req.user) {
    data.user =  (req.user.user.name)
  }
  res.json(data);

});


module.exports = router;
