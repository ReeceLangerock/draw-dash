var express = require("express");
var router = express.Router();

var returnRouter = function(io, rooms, images) {
  router.get("/:roomId", function(req, res, next) {});

  io.on("connection", socket => {
    //HANLDE USERS JOINGING AND LEAVING ROOMS
    socket.on("join_room", function(data, fn) {
      //join user to socket room
      socket.join(data.roomId);
      //emit to the room being joined that user is joining
      socket.broadcast.to(data.roomId).emit("user_join", data.user.displayName);
      fn(rooms.getRooms());
    });

    socket.on("leave_room", function(data) {
      //emit to the room being left that user is leaving
      socket.broadcast.to(data.roomId).emit("user_leave", data.user.displayName);
      //remove user from socket room
      socket.leave(data.roomId);
      //handle backend room management and cleanup
      rooms.leaveRoom(data.roomId, data.user, socket.id);
      rooms.cleanUpEmptyRooms();
      //send out updated room status
      io.sockets.emit("room_update", rooms.getRooms());
    });

    socket.on("disconnect", function(data) {
      //when user otherwise disconnects remove them from their room
      rooms.onDisconnect(socket.id);
      rooms.cleanUpEmptyRooms();
      //send out updated room status
      io.sockets.emit("room_update", rooms.getRooms());
    });

    //HANDLE DRAWING GAME ACTIONS
    socket.on("ready", function(data) {
      //check if all drawing users in the room have readied up
      var allUsersReady = rooms.toggleReadyUser(data.roomId, socket.id);
      if (allUsersReady) {
        //if all are ready, update room status and send their drawing prompt
        io.sockets.emit("room_update", rooms.getRooms());
        io.sockets.emit("all_ready", { prompt: images.getRandomImagePrompt() });
      } else {
        io.sockets.emit("room_update", rooms.getRooms());
      }
    });

    socket.on("canvas_event", function(data) {
      //on a drawing event, send the updated image to the rother users in the room
      socket.broadcast.to(data.roomId).emit("image_update", data);
    });

    socket.on("register_vote", function(data) {
      //reguster a vote
      rooms.registerVote(data.roomId, socket.id, data.vote);
    });

    socket.on("complete_vote", function(data, fn) {
      //calculate results, send them to users, and cleanup room for next round
      fn(rooms.calculateVoteResult(data.roomId));
      io.sockets.emit("room_update", rooms.getRooms());
      rooms.processRoundEnd(data.roomId);
    });

    //HANDLE CHAT MESSAGE
    socket.on("message_sent", function(data) {
      io.to(data.roomId).emit("message_received", data.message);
    });

    //HANDLE CHAT MESSAGE
    socket.on("ping_room", function(fn) {
      fn("pong");
    });
  });
  return router;
};
module.exports = returnRouter;
