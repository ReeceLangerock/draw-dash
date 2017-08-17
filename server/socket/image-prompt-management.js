
module.exports = {
  getRandomImagePrompt() {
    let randomAdjective = Math.floor(Math.random() * adjectives.length);
    let randomNoun = Math.floor(Math.random() * imagePrompts.length);
    return adjectives[randomAdjective] + ' ' + imagePrompts[randomNoun];
  },

};

const adjectives = [
  "Angry",
  "Attractive",
  "Big-eared",
  "Beautiful",
  "Colorful",
  "Cute",
  "Fashionable",
  "Flying",
  "Frightening",
  "Giant",
  "Hairy",
  "Horned",
  "Hot",
  "Large",
  "Old",
  "Sad",
  "Scary",
  "Short",
  "Sick",
  "Smelly",
  "Sweaty",
  "Tall",
  "Well-dressed",
  "Winged",
  "Young"
];

const imagePrompts = [
  "Alien",
  "Astronaut",
  "Bat",
  "Bumblebee",
  "Cat",
  "Chef",
  "Chicken",
  "Child",
  "Cow",
  "Deer",
  "Dog",
  "Dwarf",
  "Elf",
  "Ghost",
  "Horse",
  "Jellyfish",
  "Monkey",
  "Mouse",
  "Peacock",
  "Penguin",
  "Pig",
  "Puppy",
  "Robot",
  "Sheep",
  "Squirrel",
  "Superhero",
  "Turtle",
  "Web Developer",
  "Whale",
  "Wizard"
];
