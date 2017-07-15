var rooms = [];
var availableRoomId = [0,1,2,3,4,5,6,7,8,9,10,11,12]
var usedRoomId = []
const roomNames = ['Honey Badger', 'Chameleon', 'Sloth', 'Tapir', 'Red Panda', 'Bearded Dragon', 'Armadillo', 'Dolphin', 'Llama', 'Elephant', 'Puma', 'Platypus', 'Kiwis'];
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
        if (
          rooms[id].occupants &&
          rooms[id].occupants.drawers.length < MAX_OCCUPANTS
        ) {
          return false;
        }
      }
    }

    return true;
  },
  createRoom() {
    if (usedRoomId.length < MAX_ROOMS) {
      var id = availableRoomId[0]
      rooms.push({
        roomName: roomNames[id],
        roomId: id,
        namespace: "none",
        occupants: {
          drawers: [],
          watchers: []
        },
        max: MAX_OCCUPANTS
      });
      // add the id being used to the usedRoom array and remove it from availbleRoom array
      usedRoomId.push(id);
      var indexToSplice = availableRoomId.indexOf(id);
      availableRoomId.splice(indexToSplice,1);
    }
  },
  joinRoom(id, user) {
    //console.log('join room', user);
    if (user.isAuthenticated === true) {
      if (rooms[id].occupants.drawers.length < MAX_OCCUPANTS) {
        rooms[id].occupants.drawers.push(user.displayName);
      }
    } else if (user.isAuthenticated === false) {
      rooms[id].occupants.watchers.push(user.displayName);
    }
  },
  leaveRoom(id, user) {
    console.log('leaving room')
    if (user.isAuthenticated === true) {
      var indexOfUser = rooms[id].occupants.drawers.indexOf(user.displayName)
      rooms[id].occupants.drawers.splice(indexOfUser, 1)

    } else if (user.isAuthenticated === false) {
      var indexOfUser = rooms[id].occupants.watchers.indexOf(user.displayName)
      rooms[id].occupants.watchers.splice(indexOfUser, 1)
    }
  },
  cleanUpEmptyRooms() {
    for (var id in rooms) {
      if (rooms.hasOwnProperty(id)) {
        if (
          rooms[id].occupants &&
          rooms[id].occupants.drawers.length === 0 &&
          rooms[id].occupants.watchers.length === 0
        ) {
          id = parseInt(id);
          var idToSwap = rooms[id].roomId
          rooms.splice(id, 1);
          availableRoomId.push(idToSwap);
          var indexToSplice = usedRoomId.indexOf(idToSwap)
          usedRoomId.splice(indexToSplice,1)
        }
      }
    }
  }
};
