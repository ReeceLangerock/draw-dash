const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

var galleryItemSchema = mongoose.Schema({
  _id: String,
  UID: String,
  displayName: String,
  date: Date,
  imageJson: Buffer

});

galleryItemSchema.methods.newGalleryItem = function(id, data) {
  var newGalleryItem = new galleryModel({
    UID: data.UID,
    displayName: date.displayName,
    date: new Date(),
    imageJson: data.imageJson

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
