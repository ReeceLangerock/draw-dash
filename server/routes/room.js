var express = require("express");
var router = express.Router();

/* GET home page. */
var returnRouter = function(io, rooms, images) {
  router.get("/:roomId", function(req, res, next) {});
  io.on("connection", socket => {
    socket.on("join_room", function(data, fn) {
      console.log("joining room socket:", data.roomId);
      socket.join(data.roomId);
      socket.broadcast.to(data.roomId).emit("user_join", data.user.displayName);
      //socket.broadcast.emit("room_update", rooms.getRooms());
      fn(rooms.getRooms());
    });

    socket.on("leave_room", function(data) {
      console.log("leave", socket.id);
      console.log("leaving room socket:", data.roomId);
      socket.broadcast.to(data.roomId).emit("user_leave", data.user.displayName);
      socket.leave(data.roomId);
      rooms.leaveRoom(data.roomId, data.user, socket.id);
      rooms.cleanUpEmptyRooms();
      io.sockets.emit("room_update", rooms.getRooms());
    });

    socket.on("ready", function(data) {
      console.log("ready", socket.id);
      var allUsersReady = rooms.toggleReadyUser(data.roomId, socket.id);
      if (allUsersReady) {
        //start countdown function
        io.sockets.emit("room_update", rooms.getRooms());
        io.sockets.emit("all_ready", { prompt: images.getRandomImagePrompt() });
      } else {
        console.log(images.getRandomImagePrompt());
        io.sockets.emit("room_update", rooms.getRooms());
      }
    });

    socket.on("message_sent", function(data) {
      console.log("message", data);
      io.to(data.roomId).emit("message_received", data.message);
    });

    socket.on("canvas_event", function(data) {
      socket.broadcast.to(data.roomId).emit("image_update", data);
      //io.sockets.emitdata.roomId).emit("image_update", data);
    });

    socket.on("register_vote", function(data) {
      console.log("registering vote");
      rooms.registerVote(data.roomId, socket.id, data.vote);
    });

    socket.on("complete_vote", function(data, fn) {
      console.log("calculating vote", data);

      fn(rooms.calculateVoteResult(data.roomId));
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
