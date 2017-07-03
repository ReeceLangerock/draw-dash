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

  io.sockets.on('connection', function (socket) {
    socket.on("join", function(data,fn) {

        rooms.joinRoom(data.roomId);
        if (rooms.checkIfAllRoomsOccupied()) {
          rooms.createRoom();
        }
        fn(rooms.getRooms());
    });
});

  return router;
};
module.exports = returnRouter;
