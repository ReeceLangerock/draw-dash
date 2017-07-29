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
  //check through all rooms and see if all are occupied
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
  //create a room
  createRoom() {
    if (usedRoomId.length < MAX_ROOMS) {
      var id = availableRoomId[0];
      rooms.push({
        roomName: roomNames[id],
        roomId: id,
        occupants: {
          drawers: [],
          watchers: []
        },
        votes: [],
        activeGame: false,
        max: MAX_OCCUPANTS
      });
      // add the id being used to the usedRoom array and remove it from availbleRoom array
      usedRoomId.push(id);
      var indexToSplice = availableRoomId.indexOf(id);
      availableRoomId.splice(indexToSplice, 1);
    }
  },
  joinRoom(id, user, joiningAs, socketId, selectedSeat = false) {
    // if the user is 'sitting' down at a canvas after joining as a watcher,
    //add them to whichever seat they selected and remove as watcher
    if (selectedSeat) {
      this.removeWatcher(id, user, socketId);
    }
    if (rooms[id]) {
      if (joiningAs === "drawer") {
        // if joining as a drawer, calculate which canvas to put them at
        if (rooms[id].occupants.drawers.length < MAX_OCCUPANTS) {
          var canvasSeatNumber;
          if (rooms[id].occupants.drawers.length === 0) {
            selectedSeat ? (canvasSeatNumber = selectedSeat) : (canvasSeatNumber = 1);
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

        return undefined;
      }
    }
  },
  //toggle if a user is ready or not, and if both are ready return true
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
      // get ready for game start
      rooms[id].activeGame = true;
      rooms[id].votes = [];

      return true;
    } else {
      return false;
    }
  },
  registerVote(id, socketId, vote) {
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
    return winner;
  },

  processRoundEnd(id) {
    //cleanup after round end
    if (rooms[id].occupants.drawers) {
      rooms[id].occupants.drawers.map(drawer => {
        rooms[id].activeGame = false;
        drawer.isReady = false;
      });
    }
  },
  leaveRoom(id, user, socket) {
    //handle a user leaving room either as watcher or drawer
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
  //remove watcher specifically, used when user switches from watcher to drawer
  removeWatcher(id, user, socket) {
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
  },
  //handle user disconnecting other than by leaving the room
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
  //clean up extra empty rooms
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
