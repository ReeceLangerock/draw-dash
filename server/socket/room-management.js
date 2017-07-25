var rooms = [];
var availableRoomId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var usedRoomId = [];
const roomNames = ["Bear", "Chameleon", "Elephant", "Koala", "Leopard", "Owl", "Panther", "Red Panda", "Rhino", "Sloth", "Tapir", "Wombat"];
const MAX_OCCUPANTS = 2;
const MAX_ROOMS = availableRoomId.length;
module.exports = {
  getRooms() {
    return rooms;
  },

  checkIfAllRoomsOccupied() {
    if (rooms.length === 0) {
      return true;
    }
    for (var id in rooms) {
      if (rooms.hasOwnProperty(id)) {
        if (rooms[id].occupants && rooms[id].occupants.drawers.length < MAX_OCCUPANTS) {
          return false;
        }
      }
    }

    return true;
  },
  createRoom() {
    if (usedRoomId.length < MAX_ROOMS) {
      var id = availableRoomId[0];
      rooms.push({
        roomName: roomNames[id],
        roomId: id,
        namespace: "none",
        occupants: {
          drawers: [],
          watchers: []
        },
        votes: [],
        max: MAX_OCCUPANTS
      });
      // add the id being used to the usedRoom array and remove it from availbleRoom array
      usedRoomId.push(id);
      var indexToSplice = availableRoomId.indexOf(id);
      availableRoomId.splice(indexToSplice, 1);
    }
  },
  joinRoom(id, user, joiningAs, socketId) {
    if (rooms[id]) {
      if (joiningAs === "drawer") {
        if (rooms[id].occupants.drawers.length < MAX_OCCUPANTS) {
          var canvasSeatNumber;
          if (rooms[id].occupants.drawers.length === 0) {
            canvasSeatNumber = 1;
          } else if (rooms[id].occupants.drawers[0].canvasSeatNumber === 1) {
            canvasSeatNumber = 2;
          } else {
            canvasSeatNumber = 1;
          }
          rooms[id].occupants.drawers.push({
            UID: user.UID,
            socketId: socketId,
            displayName: user.displayName,
            isReady: false,
            canvasSeatNumber
          });
          return canvasSeatNumber;
        }
      } else if (joiningAs === "watcher") {
        rooms[id].occupants.watchers.push({
          UID: user.UID,
          socketId: socketId,
          displayName: user.displayName
        });
        return null;
      }
    }
  },
  toggleReadyUser(id, socketId) {
    rooms[id].occupants.drawers.map(drawer => {
      if (drawer.socketId === socketId) {
        drawer.isReady = !drawer.isReady;
      }
    });
    var readyCount = 0;
    rooms[id].occupants.drawers.map(drawer => {
      if (drawer.isReady === true) {
        readyCount++;
      }
    });
    if (readyCount === MAX_OCCUPANTS) {
      return true;
    } else {
      return false;
    }
  },
  registerVote(id, socketId, vote) {
    //var numInRoom = rooms[id].occupants.drawers.length + rooms[id].occupants.watchers.length
    rooms[id].votes.push(vote);
  },
  calculateVoteResult(id) {
    var drawingOneVotes = 0;
    var drawingTwoVotes = 0;
    var votes = rooms[id].votes;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] == 1) {
        drawingOneVotes++;
      } else {
        drawingTwoVotes++;
      }
    }
    var winner;
    if (drawingOneVotes > drawingTwoVotes) {
      winner = 1;
    } else if (drawingTwoVotes > drawingOneVotes) {
      winner = 2;
    } else {
      winner = false;
    }
    console.log("winner", winner);
    return winner;
  },
  processRoundStart(id) {
    rooms[id].votes = [];
  },
  processRoundEnd(id) {
    console.log(id);

    console.log(rooms[id]);
    if (rooms[id].occupants.drawers) {
      rooms[id].occupants.drawers.map(drawer => {
        console.log("drawer", drawer);

        drawer.isReady = false;
      });
    }
  },
  leaveRoom(id, user, socket) {
    if (!rooms[id]) {
      return 0;
    }
    if (rooms[id].occupants.watchers) {
      var indexOfUser = rooms[id].occupants.watchers
        .map(watcher => {
          return watcher.socketId;
        })
        .indexOf(socket);
      if (indexOfUser !== -1) {
        rooms[id].occupants.watchers.splice(indexOfUser, 1);
      }
    }

    if (rooms[id].occupants.drawers) {
      var indexOfUser = rooms[id].occupants.drawers
        .map(drawer => {
          return drawer.socketId;
        })
        .indexOf(socket);
      if (indexOfUser !== -1) {
        rooms[id].occupants.drawers.splice(indexOfUser, 1);
      }
    }
  },
  onDisconnect(socket) {
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].occupants.watchers) {
        var indexOfUser = rooms[i].occupants.watchers
          .map(watcher => {
            return watcher.socketId;
          })
          .indexOf(socket);

        if (indexOfUser !== -1) {
          rooms[i].occupants.watchers.splice(indexOfUser, 1);
        }
      }

      if (rooms[i].occupants.drawers) {
        var indexOfUser = rooms[i].occupants.drawers
          .map(drawer => {
            return drawer.socketId;
          })
          .indexOf(socket);
        if (indexOfUser !== -1) {
          rooms[i].occupants.drawers.splice(indexOfUser, 1);
        }
      }
    }
  },
  cleanUpEmptyRooms() {
    if (rooms.length === 1) {
      return 0;
    }
    for (var id in rooms) {
      if (rooms.hasOwnProperty(id)) {
        if (rooms[id].occupants && rooms[id].occupants.drawers.length === 0 && rooms[id].occupants.watchers.length === 0) {
          id = parseInt(id);
          var idToSwap = rooms[id].roomId;
          rooms.splice(id, 1);
          availableRoomId.push(idToSwap);
          var indexToSplice = usedRoomId.indexOf(idToSwap);
          usedRoomId.splice(indexToSplice, 1);
        }
      }
    }
  }
};
