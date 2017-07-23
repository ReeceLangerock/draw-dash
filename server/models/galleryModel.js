const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

var galleryItemSchema = mongoose.Schema({
  _id: String,
  displayName: String,
  date: Date,
  image: String

});

galleryItemSchema.methods.newGalleryItem = function(data) {
  console.log(data);
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
      return 'success';
    }
  });
};

var galleryModel = mongoose.model('galleryItem', galleryItemSchema, 'gallery');
module.exports = galleryModel;
