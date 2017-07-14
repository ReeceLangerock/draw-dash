var rooms = [{}];
var lastId = 0;
const roomNames = ['Honey Badger', 'Chameleon', 'Sloth', 'Tapir', 'Red Panda', 'Bearded Dragon', 'Armadillo', 'Dolphin', 'Llama', 'Elephant', 'Puma', 'Platypus', 'Kiwis'];
const MAX_OCCUPANTS = 2;
const MAX_ROOMS = roomNames.length;
module.exports = {
  getRooms() {
    return rooms;
  },

  checkIfAllRoomsOccupied() {
    console.log(rooms.length);
    if (rooms.length === 0) {
      return false;
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
    if (lastId < MAX_ROOMS) {
      rooms[lastId] = {
        roomName: roomNames[lastId],
        roomID: lastId,
        namespace: "none",
        occupants: {
          drawers: [],
          watchers: []
        },
        max: MAX_OCCUPANTS
      };
      lastId++;
    }
  },
  joinRoom(id, user) {
    if (user.isAuthenticated === true) {
      if (rooms[id].occupants.drawers.length < MAX_OCCUPANTS) {
        rooms[id].occupants.drawers.push(user);
      }
    } else if (user.isAuthenticated === false) {
      rooms[id].occupants.watchers.push(user);
    }
  },
  cleanUpEmptyRooms() {
    for (var id in rooms) {
      if (rooms.hasOwnProperty(id)) {
        if (
          rooms[id].occupants &&
          rooms[id].occupants.drawers.length === 0 &&
          rooms[id].occupants.drawers.length === 0
        ) {
          rooms[id] = {};
        }
      }
    }
  }
};
