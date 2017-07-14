var express = require("express");
var router = express.Router();

/* GET home page. */
var returnRouter = function(io, rooms) {
  router.get("/", function(req, res, next) {

    if (rooms.checkIfAllRoomsOccupied()) {
      rooms.createRoom();
        }

    res.json(rooms.getRooms());
  });

  io.sockets.on("connection", function(socket) {
    //handle user joining a room
    socket.on("join", function(data, fn) {
      rooms.joinRoom(data.roomId, data.user);
      if (rooms.checkIfAllRoomsOccupied()) {
        rooms.createRoom();
      }
      fn(rooms.getRooms());
    });
  });

  return router;
};
module.exports = returnRouter;
