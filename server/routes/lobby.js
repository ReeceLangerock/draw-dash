var express = require("express");
var router = express.Router();

var returnRouter = function(io, rooms) {
  router.get("/", function(req, res, next) {
    //when user navigates to /lobby, create a new room if needed, and send them the room list
    if (rooms.checkIfAllRoomsOccupied()) {
      rooms.createRoom();
      io.sockets.emit("room_update", rooms.getRooms());
    }

    res.json(rooms.getRooms());
  });

  io.sockets.on("connection", function(socket) {
    //handle user joining a room

    socket.on("join", function(data, fn) {
      //when user connects through a socket, add them to backend room management
      var canvasSeatNumber = rooms.joinRoom(data.roomId, data.user, data.joiningAs, socket.id, data.selectedSeat);
      if (rooms.checkIfAllRoomsOccupied()) {
        rooms.createRoom();
        rooms.createRoom();
      }
      io.sockets.emit("room_update", rooms.getRooms());
      fn(canvasSeatNumber);
    });

    //handle user disconnecting
    socket.on("disconnect", function(data) {
      rooms.onDisconnect(socket.id);
      rooms.cleanUpEmptyRooms();
      io.sockets.emit("room_update", rooms.getRooms());
    });
  });

  return router;
};
module.exports = returnRouter;
