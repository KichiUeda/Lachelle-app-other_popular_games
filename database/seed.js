const faker = require('faker');
const fs = require('fs');
const db = require('./index.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//genre list assigned to game product_id
const genres = [
  "Action",
  "Adventure",
  "FPS",
  "Indie",
  "MMO",
  "Multiplayer",
  "Puzzle",
  "Racing",
  "Retro",
  "RPG",
  "Simulation",
  "Sports",
  "Stealth",
  "Strategy",
  "Tabletop",
  "Virtual Reality",
]

// generating 100 records to be used as test data
let seedGenresToGames = function () {
  let genreArrayOfGames = []
  for (var i = 1; i <= 100; i++) {
    let genreIndex = i % 16;
    genreArrayOfGames.push({
      product_id: i,
      genreName: genres[genreIndex]
    })
  }
  console.log(genreArrayOfGames);
  return genreArrayOfGames;
};

//function to insert test records into DB
let seedToDB = function () {
  let data = seedGenresToGames();
  return db.collection.insertMany(data)
    .then(result => {
      console.log('Successfully inserted items: ', result);
      return result;
    })
    .catch(err => console.error(`Failed to insert documents: ${err}`));
};

//Returns a file that can be stored as gist on github per school requirements
function seedToFile() {
  let data = seedGenresToGames();
  let jsonArray = JSON.stringify(data);
  fs.writeFileSync('./database/otherPopularGames1.js', jsonArray);
  return data;
};

seedToDB();
// seedToFile();

module.exports = { seedToDB }
