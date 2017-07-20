var express = require("express");
var router = express.Router();
var gallery = require('../models/galleryModel.js')

/* GET home page. */
router.get("/", function(req, res, next) {
  getGallery().then((response, error) => {
    if(error) {

    } else {
      
      res.json(response);

    }
  })
});

function getGallery() {
  return new Promise(function(resolve, reject) {
    gallery.find({}, function(err, doc) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

module.exports = router;
