
module.exports = {
  getRandomImagePrompt() {
    let randomAdjective = Math.floor(Math.random() * adjectives.length);
    let randomNoun = Math.floor(Math.random() * imagePrompts.length);
    return adjectives[randomAdjective] + ' ' + imagePrompts[randomNoun];
  },

};

const adjectives = [
  "American",
  "Angry",
  "Attractive",
  "Beautiful",
  "Classy",
  "Clever",
  "Corrupt",
  "Cute",
  "Depressed",
  "Elderly",
  "Fashionable",
  "Flamboyant",
  "Friendly",
  "Frightening",
  "Gorgeous",
  "Hairy",
  "Hot",
  "Large",
  "Lonely",
  "Outgoing",
  "Poised",
  "Sad",
  "Scary",
  "Short",
  "Sick",
  "Smart",
  "Smelly",
  "Sweaty",
  "Well-dressed"
];

const imagePrompts = [
  "Alien",
  "Astronaut",
  "Basketball Player",
  "Chef",
  "Chicken",
  "Child",
  "Computer Programmer",
  "Dwarf",
  "Elf",
  "Farmer",
  "Fireman",
  "Ghost",
  "Grandma",
  "Grandpa",
  "Hippie",
  "Hobbit",
  "Jedi Knight",
  "Knight",
  "Millionaire",
  "Monkey",
  "Monster",
  "Ninja",
  "Pizza Delivery Guy",
  "Robot",
  "Sailor",
  "Scientist",
  "Senator",
  "Smurf",
  "Superhero",
  "Teenager",
  "Web Developer",
  "Werewolf",
  "Wizard",
  "Yeti"
];
