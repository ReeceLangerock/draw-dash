var rooms = {};
var lastId = 0;
const roomNames = ['Honey Badger', 'Chameleon', 'Sloth', 'Tapir', 'Red Panda', 'Bearded Dragon', 'Armadillo', 'Dolphin', 'Llama', 'Elephant', 'Puma', 'Platypus', 'Kiwis'];
const MAX_OCCUPANTS = 2;
const MAX_ROOMS = roomNames.length;
module.exports = {
  getRooms() {
    return rooms;
  },

  checkIfAllRoomsOccupied() {
    for (var id in rooms) {
      if (rooms.hasOwnProperty(id)) {
        if (rooms[id].occupants < MAX_OCCUPANTS) {
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
        namespace: "none",
        occupants: 0,
        max: MAX_OCCUPANTS
      };
      lastId++;
    }
  },
  joinRoom(id) {
    if (rooms[id].occupants < MAX_OCCUPANTS) {
      rooms[id].occupants++;
    }
  },
  cleanUpEmptyRooms() {}
};
