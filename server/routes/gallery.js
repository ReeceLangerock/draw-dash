var express = require("express");
var router = express.Router();
var gallery = require("../models/galleryModel.js");
var bodyParser = require("body-parser");
var gallery = require("../models/galleryModel.js");

router.use(
  bodyParser.urlencoded({
    extended: true
  })
);
router.use(bodyParser.json());

//get gallery images
router.get("/", function(req, res, next) {
  getGallery().then((response, error) => {
    if (error) {
      res.json(false)
    } else {
      res.json(response);
    }
  });
});
router.post("/", function(req, res, next) {
  //save image to database
  gallery.schema.methods.newGalleryItem(req.body);
});

//get gallery items and return the 50 most recent
function getGallery() {
  return new Promise(function(resolve, reject) {
    gallery.find({}).sort({'date':-1}).limit(50).exec(function(err, doc) {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
}

module.exports = router;
