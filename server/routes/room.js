var express = require("express");
var router = express.Router();

/* GET home page. */
var returnRouter = function(io, rooms) {
  router.get("/:roomId", function(req, res, next) {});
  io.on("connection", socket => {
    socket.on("join_room", function(data) {
      console.log("joining room socket:", data.roomId);
      socket.join(data.roomId);
      console.log("broadcast user joinged");
      socket.broadcast.to(data.roomId).emit('user_join', data.user);
      //socket.broadcast.emit("room_update", rooms.getRooms());
    });

    socket.on("leave_room", function(data) {
      console.log('leave', socket.id)
      console.log("leaving room socket:", data.roomId);
      socket.leave(data.roomId);
      rooms.leaveRoom(data.roomId, data.user, socket.id);
      rooms.cleanUpEmptyRooms();
      io.sockets.emit("room_update", rooms.getRooms());
    });

    socket.on("disconnect", function(data) {
      console.log("disconnect");
      rooms.onDisconnect(socket.id);
      rooms.cleanUpEmptyRooms();
      io.sockets.emit("room_update", rooms.getRooms());
    });



  });
  return router;
};
module.exports = returnRouter;
