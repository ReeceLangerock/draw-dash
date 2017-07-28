const mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;

// Model Schema
var galleryItemSchema = mongoose.Schema({
  _id: String,
  displayName: String,
  date: Date,
  image: String
});

//Create new gallery entry
galleryItemSchema.methods.newGalleryItem = function(data) {
  var newGalleryItem = new galleryModel({
    _id: new ObjectID(),
    displayName: data.displayName,
    date: new Date(),
    image: data.image
  });

  newGalleryItem.save(function(err) {
    if (err) {
      throw err;
    } else {
      return "success";
    }
  });
};

var galleryModel = mongoose.model("galleryItem", galleryItemSchema, "gallery");
module.exports = galleryModel;
