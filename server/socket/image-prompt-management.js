
module.exports = {
  getRandomImagePrompt() {
    var random = Math.floor(Math.random() * imagePrompts.length);
    return imagePrompts[random];
  },

};
const imagePrompts = [
  "Honey Badger",
  "Chameleon",
  "Sloth",
  "Tapir",
  "Red Panda",
  "Bearded Dragon",
  "Armadillo",
  "Dolphin",
  "Llama",
  "Elephant",
  "Puma",
  "Platypus",
  "Kiwis"
];
