var rooms = {};
var lastId = 1;
const roomNames = ['Penguin', 'Panda', 'Chameleon', "Red Pandas"]
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
          console.log(false);
          return false;
        }
      }
    }

    return true;
  },
  createRoom() {
    rooms[lastId] = {
      roomName: roomNames[lastId],
      namespace: 'none',
      occupants: 0
    };
    lastId++;
  },
  joinRoom(id) {
    if (rooms[id].occupants < MAX_OCCUPANTS) {
      console.log("join room");
      rooms[id].occupants++;
    }
  },
  cleanUpEmptyRooms() {

  }
};
