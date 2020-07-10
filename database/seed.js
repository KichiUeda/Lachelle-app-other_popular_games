const fs = require('fs');
const db = require('./index.js');
const mongoose = require('mongoose');
const OtherPopularGames = require ('./index.js');
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
let seed = function () {
  let genreArrayOfGames = []
  for (var i = 1; i <= 100; i++) {
    let genreIndex = i % 16;
    genreArrayOfGames.push({
      product_id: i,
      genreName: genres[genreIndex]
    })
  }
  //console.log(genreArrayOfGames);
  return genreArrayOfGames;
};

let seedToDB = function () {
  //call seed fn
  let data = seed();

  //insert records into db db.collection('products').insertMany
  return OtherPopularGames.insertMany(data)
    //response fr db
    .then(result => {
      console.log('Successfully inserted items: ', result);
      return result;
    })
    .catch(err => console.error(`Failed to insert documents: ${err}`));
};

seedToDB();

//Returns a file that can be stored as gist on github per school requirements
// function seedToFile() {
//   let data = seed();
//   let jsonArray = JSON.stringify(data);
//   fs.writeFileSync('./database/otherPopularGames.js', jsonArray);
//   return data;
// };

// seedToFile();
