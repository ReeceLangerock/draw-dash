var express = require("express");
var router = express.Router();
var gallery = require('../models/galleryModel.js')
var bodyParser = require("body-parser");
var gallery = require("../models/galleryModel.js");

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);
router.use(bodyParser.json());
/* GET home page. */
router.get("/", function(req, res, next) {
  getGallery().then((response, error) => {
    if(error) {

    } else {

      res.json(response);

    }
  })
});
router.use(bodyParser.json());
router.post("/", function(req, res, next) {
  console.log('post image', req.body);
  //ADD BACK LATER
  //gallery.schema.methods.newGalleryItem(req.body);


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
