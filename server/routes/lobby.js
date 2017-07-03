var express = require("express");
var router = express.Router();

/* GET home page. */
var returnRouter = function(io, rooms) {
  router.get("/", function(req, res, next) {
    if (rooms.checkIfAllRoomsOccupied()) {
      rooms.createRoom();
    }
    rooms.joinRoom(1)
    console.log(rooms.getRooms());
    res.json(rooms.getRooms());
  });

  return router;
};
module.exports = returnRouter;
