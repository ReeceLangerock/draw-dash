var express = require("express");
var router = express.Router();
var clients = [];
/* GET home page. */
var returnRouter = function(io, rooms) {
  router.get("/", function(req, res, next) {

    if (rooms.checkIfAllRoomsOccupied()) {
      rooms.createRoom();
      io.sockets.emit('room_update',rooms.getRooms());
        }

    res.json(rooms.getRooms());
  });

  io.sockets.on("connection", function(socket) {
    //handle user joining a room
    clients.push(socket.id);
    console.log('lobby', socket.id)
    socket.on("join", function(data, fn) {
      console.log('join ', socket.id)
      console.log('lobby join room')
      rooms.joinRoom(data.roomId, data.user, data.joiningAs, socket.id);
      if (rooms.checkIfAllRoomsOccupied()) {
        rooms.createRoom();
      }
      console.log('broadcast rooms from lobby')
      io.sockets.emit('room_update',rooms.getRooms());
      fn(rooms.getRooms());
    });

    // socket.on("leave", function(data, fn) {
    //   console.log('lobby leave room')
    //   rooms.leaveRoom(data.roomId, data.user, socket.id);
    //   rooms.cleanUpEmptyRooms();
    //   console.log('broadcast rooms from lobby')
    //   socket.broadcast.emit('room_update',rooms.getRooms());
    //   fn(rooms.getRooms());
    // });

    socket.on("disconnect", function(data) {
      console.log("disconnect", socket.id);
      rooms.onDisconnect(socket.id);
      rooms.cleanUpEmptyRooms();
      io.sockets.emit("room_update", rooms.getRooms());
    });
  });

  return router;
};
module.exports = returnRouter;
